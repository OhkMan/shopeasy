-- Create Users table
CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    email NVARCHAR(255) UNIQUE NOT NULL,
    name NVARCHAR(255) NOT NULL,
    password NVARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT GETDATE()
);

-- Create Products table
CREATE TABLE Products (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX),
    price DECIMAL(10,2) NOT NULL,
    imageUrl NVARCHAR(255),
    stock INT DEFAULT 0,
    createdAt DATETIME DEFAULT GETDATE()
);

-- Create Orders table
CREATE TABLE Orders (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status NVARCHAR(50) DEFAULT 'pending',
    createdAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES Users(id)
);

-- Create OrderItems table
CREATE TABLE OrderItems (
    id INT IDENTITY(1,1) PRIMARY KEY,
    orderId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (orderId) REFERENCES Orders(id),
    FOREIGN KEY (productId) REFERENCES Products(id)
);

-- Insert sample products
INSERT INTO Products (name, description, price, stock)
VALUES 
('Sample Product 1', 'This is a sample product description', 29.99, 100),
('Sample Product 2', 'Another sample product description', 39.99, 50),
('Sample Product 3', 'Yet another sample product description', 49.99, 75); 