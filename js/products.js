const PRODUCTS = [
    {
        id: 1,
        name: "Wireless Earbuds Pro Max",
        price: 99.99,
        originalPrice: 129.99,
        rating: 4.5,
        reviews: 150,
        category: "Electronics",
        images: [
            "images/products/earbuds-1.jpg",
            "images/products/earbuds-2.jpg",
            "images/products/earbuds-3.jpg",
            "images/products/earbuds-4.jpg"
        ],
        description: "Experience crystal-clear sound with our latest Wireless Earbuds Pro Max. Features include:",
        features: [
            "Active Noise Cancellation",
            "40-hour battery life with charging case",
            "IPX7 water resistance",
            "Touch controls",
            "Bluetooth 5.2 connectivity"
        ],
        specifications: {
            "Battery Life": "40 hours",
            "Bluetooth Version": "5.2",
            "Water Resistance": "IPX7",
            "Weight": "5.5g per earbud",
            "Charging Time": "1.5 hours"
        }
    },
    {
        id: 2,
        name: "Smart Watch Series 5",
        price: 149.99,
        originalPrice: 199.99,
        rating: 5,
        reviews: 89,
        category: "Electronics",
        images: [
            "images/products/watch-1.jpg",
            "images/products/watch-2.jpg",
            "images/products/watch-3.jpg",
            "images/products/watch-4.jpg"
        ],
        description: "Stay connected and track your fitness with our advanced Smart Watch Series 5.",
        features: [
            "Heart rate monitoring",
            "Sleep tracking",
            "GPS navigation",
            "Water resistant",
            "5-day battery life"
        ],
        specifications: {
            "Display": "1.4 inch AMOLED",
            "Battery Life": "5 days",
            "Water Resistance": "5ATM",
            "Compatibility": "iOS and Android",
            "Weight": "45g"
        }
    },
    {
        id: 3,
        name: "Laptop Backpack",
        price: 59.99,
        originalPrice: 79.99,
        rating: 4.2,
        reviews: 234,
        category: "Accessories",
        images: [
            "images/products/backpack-1.jpg",
            "images/products/backpack-2.jpg",
            "images/products/backpack-3.jpg",
            "images/products/backpack-4.jpg"
        ],
        description: "Spacious and durable laptop backpack with multiple compartments.",
        features: [
            "Fits 15.6\" laptops",
            "Water resistant",
            "USB charging port",
            "Anti-theft design",
            "Padded straps"
        ],
        specifications: {
            "Capacity": "25L",
            "Material": "Polyester",
            "Weight": "0.8kg",
            "Dimensions": "30x45x15cm",
            "Color Options": "Black, Navy, Gray"
        }
    },
    {
        id: 4,
        name: "Portable Charger 20000mAh",
        price: 29.99,
        originalPrice: 39.99,
        rating: 4.8,
        reviews: 567,
        category: "Electronics",
        images: [
            "images/products/charger-1.jpg",
            "images/products/charger-2.jpg",
            "images/products/charger-3.jpg",
            "images/products/charger-4.jpg"
        ],
        description: "High-capacity portable charger with fast charging technology.",
        features: [
            "20000mAh capacity",
            "Fast charging",
            "Multiple ports",
            "LED indicator",
            "Compact design"
        ],
        specifications: {
            "Capacity": "20000mAh",
            "Output": "5V/2.4A",
            "Input": "5V/2A",
            "Weight": "400g",
            "Dimensions": "15x7x2cm"
        }
    },
    {
        id: 5,
        name: "4K Ultra HD Smart TV 55\"",
        price: 699.99,
        originalPrice: 899.99,
        rating: 4.7,
        reviews: 324,
        category: "Electronics",
        images: [
            "images/products/tv-1.jpg",
            "images/products/tv-2.jpg",
            "images/products/tv-3.jpg",
            "images/products/tv-4.jpg"
        ],
        description: "Experience stunning 4K resolution and smart features with this 55-inch TV.",
        features: [
            "4K Ultra HD Resolution",
            "Smart TV capabilities",
            "HDR support",
            "Voice control",
            "Multiple HDMI ports"
        ],
        specifications: {
            "Screen Size": "55 inches",
            "Resolution": "3840 x 2160",
            "Refresh Rate": "60Hz",
            "HDR": "Yes",
            "Smart Platform": "Android TV"
        }
    },
    {
        id: 6,
        name: "Premium Leather Wallet",
        price: 49.99,
        originalPrice: 69.99,
        rating: 4.6,
        reviews: 892,
        category: "Accessories",
        images: [
            "images/products/wallet-1.jpg",
            "images/products/wallet-2.jpg",
            "images/products/wallet-3.jpg",
            "images/products/wallet-4.jpg"
        ],
        description: "Handcrafted genuine leather wallet with RFID protection.",
        features: [
            "Genuine leather",
            "RFID blocking",
            "Multiple card slots",
            "Bill compartment",
            "Coin pocket"
        ],
        specifications: {
            "Material": "Genuine Leather",
            "Dimensions": "4.5x3.5x0.5 inches",
            "Card Slots": "8",
            "Color Options": "Brown, Black, Tan",
            "RFID Protection": "Yes"
        }
    },
    {
        id: 7,
        name: "Athletic Running Shoes",
        price: 89.99,
        originalPrice: 119.99,
        rating: 4.8,
        reviews: 756,
        category: "Clothing",
        images: [
            "images/products/shoes-1.jpg",
            "images/products/shoes-2.jpg",
            "images/products/shoes-3.jpg",
            "images/products/shoes-4.jpg"
        ],
        description: "Lightweight and comfortable running shoes with advanced cushioning.",
        features: [
            "Breathable mesh upper",
            "Responsive cushioning",
            "Durable outsole",
            "Arch support",
            "Reflective details"
        ],
        specifications: {
            "Size Range": "7-13 US",
            "Weight": "9.5 oz",
            "Material": "Mesh and synthetic",
            "Cushioning": "High",
            "Arch Type": "Neutral"
        }
    },
    {
        id: 8,
        name: "Professional Camera Kit",
        price: 1299.99,
        originalPrice: 1499.99,
        rating: 4.9,
        reviews: 245,
        category: "Electronics",
        images: [
            "images/products/camera-1.jpg",
            "images/products/camera-2.jpg",
            "images/products/camera-3.jpg",
            "images/products/camera-4.jpg"
        ],
        description: "Professional DSLR camera with multiple lenses and accessories.",
        features: [
            "24.2MP sensor",
            "4K video recording",
            "Multiple lens kit",
            "Wi-Fi connectivity",
            "Weather-sealed body"
        ],
        specifications: {
            "Sensor": "24.2MP APS-C",
            "ISO Range": "100-51200",
            "Video": "4K/30fps",
            "Screen": "3-inch touchscreen",
            "Battery Life": "1200 shots"
        }
    },
    {
        id: 9,
        name: "Classic Denim Jacket",
        price: 79.99,
        originalPrice: 99.99,
        rating: 4.5,
        reviews: 567,
        category: "Clothing",
        images: [
            "images/products/jacket-1.jpg",
            "images/products/jacket-2.jpg",
            "images/products/jacket-3.jpg",
            "images/products/jacket-4.jpg"
        ],
        description: "Timeless denim jacket with a modern fit and classic styling.",
        features: [
            "100% cotton denim",
            "Button front closure",
            "Multiple pockets",
            "Adjustable waist",
            "Machine washable"
        ],
        specifications: {
            "Material": "100% Cotton",
            "Fit": "Regular",
            "Sizes": "XS-XXL",
            "Care": "Machine wash",
            "Color": "Medium wash"
        }
    },
    {
        id: 10,
        name: "Bestseller Fiction Book",
        price: 24.99,
        originalPrice: 29.99,
        rating: 4.7,
        reviews: 1203,
        category: "Books",
        images: [
            "images/products/book-1.jpg",
            "images/products/book-2.jpg",
            "images/products/book-3.jpg",
            "images/products/book-4.jpg"
        ],
        description: "Award-winning novel that's captivating readers worldwide.",
        features: [
            "Hardcover edition",
            "Award-winning author",
            "International bestseller",
            "Includes bonus content",
            "Book club guide"
        ],
        specifications: {
            "Format": "Hardcover",
            "Pages": "384",
            "Language": "English",
            "Publisher": "Premium Press",
            "Release Date": "2024"
        }
    },
    {
        id: 11,
        name: "Smart Home Security Camera",
        price: 129.99,
        originalPrice: 159.99,
        rating: 4.6,
        reviews: 892,
        category: "Electronics",
        images: [
            "images/products/camera-1.jpg",
            "images/products/camera-2.jpg",
            "images/products/camera-3.jpg",
            "images/products/camera-4.jpg"
        ],
        description: "HD security camera with night vision and two-way audio.",
        features: [
            "1080p HD video",
            "Night vision",
            "Two-way audio",
            "Motion detection",
            "Cloud storage"
        ],
        specifications: {
            "Resolution": "1080p",
            "Field of View": "130°",
            "Storage": "Cloud + Local",
            "Power": "AC adapter",
            "Connectivity": "Wi-Fi"
        }
    },
    {
        id: 12,
        name: "Indoor Plant Set",
        price: 49.99,
        originalPrice: 69.99,
        rating: 4.4,
        reviews: 345,
        category: "Home & Garden",
        images: [
            "images/products/plant-1.jpg",
            "images/products/plant-2.jpg",
            "images/products/plant-3.jpg",
            "images/products/plant-4.jpg"
        ],
        description: "Set of 3 easy-care indoor plants with decorative pots.",
        features: [
            "Low maintenance plants",
            "Decorative pots included",
            "Air purifying",
            "Care guide included",
            "Pet-friendly varieties"
        ],
        specifications: {
            "Plants Included": "3",
            "Pot Size": "4-6 inches",
            "Light Needs": "Low to medium",
            "Water Needs": "Weekly",
            "Height": "8-12 inches"
        }
    },
    {
        id: 13,
        name: "Stainless Steel Water Bottle",
        price: 29.99,
        originalPrice: 39.99,
        rating: 4.7,
        reviews: 678,
        category: "Accessories",
        images: [
            "images/products/bottle-1.jpg",
            "images/products/bottle-2.jpg",
            "images/products/bottle-3.jpg",
            "images/products/bottle-4.jpg"
        ],
        description: "Double-walled insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours.",
        features: [
            "24-hour cold retention",
            "12-hour hot retention",
            "BPA-free",
            "Leak-proof lid",
            "Sweat-free design"
        ],
        specifications: {
            "Capacity": "32 oz",
            "Material": "18/8 Stainless Steel",
            "Weight": "0.7 lbs",
            "Dimensions": "3x3x10 inches",
            "Dishwasher Safe": "Yes"
        }
    },
    {
        id: 14,
        name: "Yoga Mat Premium",
        price: 39.99,
        originalPrice: 49.99,
        rating: 4.8,
        reviews: 445,
        category: "Accessories",
        images: [
            "images/products/yoga-1.jpg",
            "images/products/yoga-2.jpg",
            "images/products/yoga-3.jpg",
            "images/products/yoga-4.jpg"
        ],
        description: "Extra thick and comfortable yoga mat with perfect grip and alignment lines.",
        features: [
            "6mm thickness",
            "Non-slip surface",
            "Alignment lines",
            "Eco-friendly material",
            "Carrying strap included"
        ],
        specifications: {
            "Thickness": "6mm",
            "Length": "72 inches",
            "Width": "24 inches",
            "Material": "TPE",
            "Weight": "2.5 lbs"
        }
    },
    {
        id: 15,
        name: "Smart Coffee Maker",
        price: 149.99,
        originalPrice: 199.99,
        rating: 4.6,
        reviews: 234,
        category: "Home & Garden",
        images: [
            "images/products/coffee-1.jpg",
            "images/products/coffee-2.jpg",
            "images/products/coffee-3.jpg",
            "images/products/coffee-4.jpg"
        ],
        description: "WiFi-enabled coffee maker with smartphone control and scheduling.",
        features: [
            "Smart home compatible",
            "12-cup capacity",
            "Programmable brewing",
            "Keep warm function",
            "Auto shut-off"
        ],
        specifications: {
            "Capacity": "12 cups",
            "Power": "1000W",
            "Filter Type": "Permanent",
            "Water Tank": "1.8L",
            "Warranty": "2 years"
        }
    },
    {
        id: 16,
        name: "Wireless Gaming Mouse",
        price: 79.99,
        originalPrice: 99.99,
        rating: 4.9,
        reviews: 892,
        category: "Electronics",
        images: [
            "images/products/mouse-1.jpg",
            "images/products/mouse-2.jpg",
            "images/products/mouse-3.jpg",
            "images/products/mouse-4.jpg"
        ],
        description: "High-precision wireless gaming mouse with customizable RGB lighting.",
        features: [
            "25,000 DPI sensor",
            "Wireless technology",
            "RGB lighting",
            "8 programmable buttons",
            "70-hour battery life"
        ],
        specifications: {
            "Sensor": "Optical",
            "DPI Range": "100-25,000",
            "Buttons": "8",
            "Weight": "85g",
            "Connection": "2.4GHz/Bluetooth"
        }
    },
    {
        id: 17,
        name: "Cookbook Collection",
        price: 59.99,
        originalPrice: 79.99,
        rating: 4.7,
        reviews: 567,
        category: "Books",
        images: [
            "images/products/cookbook-1.jpg",
            "images/products/cookbook-2.jpg",
            "images/products/cookbook-3.jpg",
            "images/products/cookbook-4.jpg"
        ],
        description: "Set of 3 bestselling cookbooks featuring international cuisine.",
        features: [
            "3 hardcover books",
            "500+ recipes",
            "Step-by-step instructions",
            "Beautiful photography",
            "International cuisine"
        ],
        specifications: {
            "Books Included": "3",
            "Total Pages": "750",
            "Language": "English",
            "Publisher": "Culinary Press",
            "Publication Year": "2024"
        }
    },
    {
        id: 18,
        name: "Designer Sunglasses",
        price: 159.99,
        originalPrice: 199.99,
        rating: 4.6,
        reviews: 345,
        category: "Accessories",
        images: [
            "images/products/sunglasses-1.jpg",
            "images/products/sunglasses-2.jpg",
            "images/products/sunglasses-3.jpg",
            "images/products/sunglasses-4.jpg"
        ],
        description: "Premium polarized sunglasses with UV protection and stylish design.",
        features: [
            "Polarized lenses",
            "UV400 protection",
            "Lightweight frame",
            "Anti-glare coating",
            "Premium case included"
        ],
        specifications: {
            "Frame Material": "Acetate",
            "Lens Material": "Polycarbonate",
            "UV Protection": "100%",
            "Frame Size": "Medium",
            "Style": "Aviator"
        }
    }
];

class ProductService {
    static getAllProducts() {
        return PRODUCTS;
    }

    static getProductById(id) {
        return PRODUCTS.find(product => product.id === parseInt(id));
    }

    static searchProducts(query) {
        const searchTerm = query.toLowerCase();
        return PRODUCTS.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }

    static getProductsByCategory(category) {
        return PRODUCTS.filter(product => product.category === category);
    }

    static getRelatedProducts(productId, limit = 3) {
        const product = this.getProductById(productId);
        if (!product) return [];
        
        return PRODUCTS
            .filter(p => p.id !== productId && p.category === product.category)
            .slice(0, limit);
    }
}

// Export for use in other files
window.ProductService = ProductService; 