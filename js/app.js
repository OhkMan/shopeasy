// Azure Configuration
const Azure = {
    webApp: {
        apiBaseUrl: 'http://localhost:3000'  // Update this to your actual API URL when deployed
    }
};

// State Management
const AppState = {
    user: null,
    cart: [],
    products: [],
    orders: []
};

// Authentication Service
class AuthService {
    static async login(email, password) {
        try {
            const response = await fetch(`${Azure.webApp.apiBaseUrl}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            if (!response.ok) throw new Error('Login failed');
            
            const data = await response.json();
            AppState.user = data.user;
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    static async register(userData) {
        try {
            const response = await fetch(`${Azure.webApp.apiBaseUrl}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            
            if (!response.ok) throw new Error('Registration failed');
            
            return await response.json();
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    static logout() {
        AppState.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login.html';
    }

    static checkAuthStatus() {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            AppState.user = JSON.parse(user);
            return true;
        }
        return false;
    }
}

// Cart Service
class CartService {
    static init() {
        this.loadCartFromLocal();
        this.setupCartEventListeners();
    }

    static setupCartEventListeners() {
        // Remove existing event listeners
        const existingButtons = document.querySelectorAll('.add-to-cart-btn');
        existingButtons.forEach(button => {
            button.replaceWith(button.cloneNode(true));
        });

        // Add new event listeners
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                try {
                    const productId = parseInt(button.dataset.productId);
                    const product = await ProductService.getProductDetails(productId);
                    await CartService.addToCart(product);
                    alert('Product added to cart!');
                } catch (error) {
                    alert('Failed to add product to cart.');
                }
            });
        });
    }

    static async addToCart(product) {
        try {
            // Check if product already exists in cart
            const existingItem = AppState.cart.find(item => item.id === product.id);
            
            if (existingItem) {
                // Update quantity if product already exists
                existingItem.quantity = (existingItem.quantity || 1) + 1;
            } else {
                // Add new product with quantity 1
                AppState.cart.push({
                    ...product,
                    quantity: 1
                });
            }

            this.saveCartToLocal();
            this.updateCartUI();
            return true;
        } catch (error) {
            console.error('Add to cart error:', error);
            return false;
        }
    }

    static async removeFromCart(productId) {
        try {
            AppState.cart = AppState.cart.filter(item => item.id !== productId);
            this.saveCartToLocal();
            this.updateCartUI();
            return true;
        } catch (error) {
            console.error('Remove from cart error:', error);
            return false;
        }
    }

    static updateQuantity(productId, quantity) {
        try {
            const item = AppState.cart.find(item => item.id === productId);
            if (item) {
                if (quantity <= 0) {
                    // Remove item if quantity is 0 or negative
                    this.removeFromCart(productId);
                } else {
                    item.quantity = quantity;
                    this.saveCartToLocal();
                    this.updateCartUI();
                }
            }
            return true;
        } catch (error) {
            console.error('Update quantity error:', error);
            return false;
        }
    }

    static updateCartUI() {
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = AppState.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
            cartCount.textContent = totalItems;
        }

        // Update cart items display if on cart page
        const cartItemsContainer = document.getElementById('cart-items');
        if (cartItemsContainer) {
            this.updateCartPage();
        }
    }

    static updateCartPage() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        
        if (cartItemsContainer) {
            if (AppState.cart.length === 0) {
                cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
                if (cartTotalElement) cartTotalElement.textContent = '$0.00';
                return;
            }

            cartItemsContainer.innerHTML = AppState.cart.map(item => `
                <div class="cart-item" data-product-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.imageUrl || '/images/placeholder.jpg'}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p class="price">$${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus" onclick="CartService.updateQuantity(${item.id}, ${(item.quantity || 1) - 1})">-</button>
                            <span class="quantity">${item.quantity || 1}</span>
                            <button class="quantity-btn plus" onclick="CartService.updateQuantity(${item.id}, ${(item.quantity || 1) + 1})">+</button>
                        </div>
                    </div>
                    <button class="remove-btn" onclick="CartService.removeFromCart(${item.id})">×</button>
                </div>
            `).join('');

            // Update total
            if (cartTotalElement) {
                const total = AppState.cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
                cartTotalElement.textContent = `$${total.toFixed(2)}`;
            }
        }
    }

    static saveCartToLocal() {
        localStorage.setItem('cart', JSON.stringify(AppState.cart));
    }

    static loadCartFromLocal() {
        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                AppState.cart = JSON.parse(savedCart);
                // Ensure all items have a quantity
                AppState.cart = AppState.cart.map(item => ({
                    ...item,
                    quantity: item.quantity || 1
                }));
            } else {
                AppState.cart = [];
            }
            this.updateCartUI();
        } catch (error) {
            console.error('Load cart error:', error);
            AppState.cart = [];
        }
    }

    static clearCart() {
        AppState.cart = [];
        this.saveCartToLocal();
        this.updateCartUI();
    }

    static getCartTotal() {
        return AppState.cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    }
}

// Product Service
class ProductService {
    static async getProducts() {
        try {
            const response = await fetch(`${Azure.webApp.apiBaseUrl}/api/products`);
            if (!response.ok) throw new Error('Failed to fetch products');
            AppState.products = await response.json();
            return AppState.products;
        } catch (error) {
            console.error('Get products error:', error);
            throw error;
        }
    }

    static async getProductDetails(productId) {
        try {
            const response = await fetch(`${Azure.webApp.apiBaseUrl}/api/products/${productId}`);
            if (!response.ok) throw new Error('Failed to fetch product details');
            return await response.json();
        } catch (error) {
            console.error('Get product details error:', error);
            throw error;
        }
    }
}

// Order Service
class OrderService {
    static async placeOrder(orderData) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${Azure.webApp.apiBaseUrl}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });
            
            if (!response.ok) throw new Error('Order placement failed');
            
            // Clear cart after successful order
            CartService.clearCart();
            
            return await response.json();
        } catch (error) {
            console.error('Place order error:', error);
            throw error;
        }
    }

    static async getOrderHistory() {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${Azure.webApp.apiBaseUrl}/api/orders`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) throw new Error('Failed to fetch order history');
            AppState.orders = await response.json();
            return AppState.orders;
        } catch (error) {
            console.error('Get order history error:', error);
            throw error;
        }
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication status
    AuthService.checkAuthStatus();
    
    // Initialize cart
    CartService.init();
    
    // Add event listeners
    setupEventListeners();
});

function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                await AuthService.login(email, password);
                window.location.href = '/account.html';
            } catch (error) {
                alert('Login failed. Please try again.');
            }
        });
    }

    // Register form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const userData = {
                    name: document.getElementById('register-name').value,
                    email: document.getElementById('register-email').value,
                    password: document.getElementById('register-password').value
                };
                await AuthService.register(userData);
                alert('Registration successful! Please login.');
                window.location.href = '/login.html';
            } catch (error) {
                alert('Registration failed. Please try again.');
            }
        });
    }

    // Checkout button
    const checkoutButton = document.querySelector('.checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', async () => {
            try {
                if (!AppState.user) {
                    window.location.href = '/login.html';
                    return;
                }
                
                const orderData = {
                    items: AppState.cart,
                    total: CartService.getCartTotal()
                };
                
                await OrderService.placeOrder(orderData);
                alert('Order placed successfully!');
                window.location.href = '/account.html';
            } catch (error) {
                alert('Failed to place order. Please try again.');
            }
        });
    }
}

// Export services for use in other files
export {
    AuthService,
    CartService,
    ProductService,
    OrderService
}; 