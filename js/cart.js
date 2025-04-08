class CartService {
    static STORAGE_KEY = 'shopeasy_cart';

    static getCart() {
        const cart = localStorage.getItem(this.STORAGE_KEY);
        return cart ? JSON.parse(cart) : { items: [], total: 0 };
    }

    static saveCart(cart) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    }

    static addToCart(productId, quantity = 1) {
        const cart = this.getCart();
        const product = ProductService.getProductById(productId);
        
        if (!product) {
            throw new Error('Product not found');
        }

        const existingItem = cart.items.find(item => item.productId === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                productId,
                quantity,
                price: product.price,
                name: product.name,
                image: product.images[0]
            });
        }

        this.updateCartTotal(cart);
        this.saveCart(cart);
        this.updateCartUI();
    }

    static updateQuantity(productId, change) {
        const cart = this.getCart();
        const item = cart.items.find(item => item.productId === productId);
        
        if (!item) {
            throw new Error('Item not found in cart');
        }

        item.quantity += change;
        
        if (item.quantity <= 0) {
            cart.items = cart.items.filter(item => item.productId !== productId);
        }

        this.updateCartTotal(cart);
        this.saveCart(cart);
        this.updateCartUI();
    }

    static removeItem(productId) {
        const cart = this.getCart();
        cart.items = cart.items.filter(item => item.productId !== productId);
        this.updateCartTotal(cart);
        this.saveCart(cart);
        this.updateCartUI();
    }

    static updateCartTotal(cart) {
        cart.total = cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    static updateCartUI() {
        const cart = this.getCart();
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }

        // Update cart page if we're on it
        if (window.location.pathname.includes('cart.html')) {
            this.renderCartPage(cart);
        }
    }

    static renderCartPage(cart) {
        const cartItems = document.querySelector('.cart-items');
        if (!cartItems) return;

        if (cart.items.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added any items to your cart yet.</p>
                    <a href="index.html" class="btn">Continue Shopping</a>
                </div>
            `;
            document.querySelector('.cart-summary').style.display = 'none';
            return;
        }

        cartItems.innerHTML = `
            <h2>Shopping Cart (${cart.items.reduce((sum, item) => sum + item.quantity, 0)} items)</h2>
            ${cart.items.map(item => `
                <div class="cart-item" data-product-id="${item.productId}">
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="item-quantity">
                        <button class="quantity-btn" onclick="CartService.updateQuantity(${item.productId}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="CartService.updateQuantity(${item.productId}, 1)">+</button>
                    </div>
                    <button class="remove-item" onclick="CartService.removeItem(${item.productId})">×</button>
                </div>
            `).join('')}
        `;

        // Update summary
        const summary = document.querySelector('.cart-summary');
        if (summary) {
            const subtotal = cart.total;
            const tax = subtotal * 0.1; // 10% tax
            const total = subtotal + tax;

            summary.querySelector('.summary-row:first-child span:last-child').textContent = `$${subtotal.toFixed(2)}`;
            summary.querySelector('.summary-row:nth-child(3) span:last-child').textContent = `$${tax.toFixed(2)}`;
            summary.querySelector('.summary-total span:last-child').textContent = `$${total.toFixed(2)}`;
        }
    }

    static clearCart() {
        this.saveCart({ items: [], total: 0 });
        this.updateCartUI();
    }
}

// Initialize cart UI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    CartService.updateCartUI();
}); 