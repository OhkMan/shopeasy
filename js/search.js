class SearchService {
    static init() {
        const searchInput = document.querySelector('.search-bar input');
        if (!searchInput) return;

        // Create search results container
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-results';
        searchInput.parentNode.appendChild(searchContainer);

        // Add event listeners
        searchInput.addEventListener('input', this.handleSearch.bind(this));
        searchInput.addEventListener('focus', this.handleFocus.bind(this));
        document.addEventListener('click', this.handleClickOutside.bind(this));
    }

    static handleSearch(event) {
        const query = event.target.value.trim();
        const searchResults = document.querySelector('.search-results');
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        const results = ProductService.searchProducts(query);
        this.displayResults(results);
    }

    static handleFocus(event) {
        const query = event.target.value.trim();
        if (query.length >= 2) {
            const results = ProductService.searchProducts(query);
            this.displayResults(results);
        }
    }

    static handleClickOutside(event) {
        const searchContainer = document.querySelector('.search-results');
        const searchInput = document.querySelector('.search-bar input');
        
        if (!searchContainer.contains(event.target) && event.target !== searchInput) {
            searchContainer.style.display = 'none';
        }
    }

    static displayResults(results) {
        const searchResults = document.querySelector('.search-results');
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No products found</div>';
            searchResults.style.display = 'block';
            return;
        }

        const html = results.map(product => `
            <a href="product-details.html?id=${product.id}" class="search-result-item">
                <img src="${product.images[0]}" alt="${product.name}">
                <div class="result-info">
                    <h4>${product.name}</h4>
                    <p class="price">$${product.price}</p>
                    <p class="category">${product.category}</p>
                </div>
            </a>
        `).join('');

        searchResults.innerHTML = html;
        searchResults.style.display = 'block';
    }
}

// Add styles for search results
const style = document.createElement('style');
style.textContent = `
    .search-results {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        max-height: 400px;
        overflow-y: auto;
        z-index: 1000;
        display: none;
    }

    .search-result-item {
        display: flex;
        padding: 10px;
        text-decoration: none;
        color: var(--text-color);
        border-bottom: 1px solid #eee;
    }

    .search-result-item:hover {
        background: var(--light-bg);
    }

    .search-result-item img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 4px;
        margin-right: 10px;
    }

    .result-info {
        flex: 1;
    }

    .result-info h4 {
        margin: 0 0 5px 0;
        font-size: 0.9rem;
    }

    .result-info .price {
        color: var(--primary-color);
        font-weight: 600;
        margin: 0;
    }

    .result-info .category {
        color: #666;
        font-size: 0.8rem;
        margin: 0;
    }

    .no-results {
        padding: 20px;
        text-align: center;
        color: #666;
    }
`;
document.head.appendChild(style);

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    SearchService.init();
}); 