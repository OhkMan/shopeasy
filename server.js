const express = require('express');
const sql = require('mssql');
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Azure SQL Database configuration
const sqlConfig = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
};

// Azure Storage configuration
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(process.env.STORAGE_CONTAINER_NAME);

// Multer configuration for image upload
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Routes
// 1. Authentication
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const pool = await sql.connect(sqlConfig);
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .input('name', sql.NVarChar, name)
            .input('password', sql.NVarChar, hashedPassword)
            .query(`
                INSERT INTO Users (email, name, password)
                VALUES (@email, @name, @password);
                SELECT SCOPE_IDENTITY() as id;
            `);

        res.status(201).json({ message: 'User registered successfully', userId: result.recordset[0].id });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const pool = await sql.connect(sqlConfig);
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');

        const user = result.recordset[0];
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// 2. Products
app.get('/api/products', async (req, res) => {
    try {
        const pool = await sql.connect(sqlConfig);
        const result = await pool.request().query('SELECT * FROM Products');
        res.json(result.recordset);
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const pool = await sql.connect(sqlConfig);
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('SELECT * FROM Products WHERE id = @id');
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(result.recordset[0]);
    } catch (error) {
        console.error('Get product details error:', error);
        res.status(500).json({ error: 'Failed to fetch product details' });
    }
});

// Image upload endpoint
app.post('/api/products/:id/image', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        const productId = req.params.id;
        const blobName = `product-${productId}-${Date.now()}.jpg`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Upload image to Azure Storage
        await blockBlobClient.upload(req.file.buffer, req.file.size);

        // Update product image URL in database
        const imageUrl = blockBlobClient.url;
        const pool = await sql.connect(sqlConfig);
        await pool.request()
            .input('id', sql.Int, productId)
            .input('imageUrl', sql.NVarChar, imageUrl)
            .query('UPDATE Products SET imageUrl = @imageUrl WHERE id = @id');

        res.json({ imageUrl });
    } catch (error) {
        console.error('Image upload error:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

// 3. Orders
app.post('/api/orders', authenticateToken, async (req, res) => {
    try {
        const { items, total } = req.body;
        const userId = req.user.id;

        const pool = await sql.connect(sqlConfig);
        const result = await pool.request()
            .input('userId', sql.Int, userId)
            .input('total', sql.Decimal(10, 2), total)
            .query(`
                INSERT INTO Orders (userId, total)
                VALUES (@userId, @total);
                SELECT SCOPE_IDENTITY() as orderId;
            `);

        const orderId = result.recordset[0].orderId;

        // Insert order items
        for (const item of items) {
            await pool.request()
                .input('orderId', sql.Int, orderId)
                .input('productId', sql.Int, item.id)
                .input('quantity', sql.Int, item.quantity)
                .input('price', sql.Decimal(10, 2), item.price)
                .query(`
                    INSERT INTO OrderItems (orderId, productId, quantity, price)
                    VALUES (@orderId, @productId, @quantity, @price)
                `);
        }

        res.status(201).json({ message: 'Order placed successfully', orderId });
    } catch (error) {
        console.error('Place order error:', error);
        res.status(500).json({ error: 'Failed to place order' });
    }
});

app.get('/api/orders', authenticateToken, async (req, res) => {
    try {
        const pool = await sql.connect(sqlConfig);
        const result = await pool.request()
            .input('userId', sql.Int, req.user.id)
            .query(`
                SELECT o.*, oi.*
                FROM Orders o
                JOIN OrderItems oi ON o.id = oi.orderId
                WHERE o.userId = @userId
                ORDER BY o.createdAt DESC
            `);
        res.json(result.recordset);
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 