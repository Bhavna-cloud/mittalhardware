// Product Data
const products = [
    {
        id: 1,
        name: "Asian Paints Royale",
        price: 2499,
        image: "https://images.unsplash.com/photo-1579027989534-ba459c1baf43",
        category: "paint"
    },
    {
        id: 2,
        name: "Berger Paints",
        price: 2199,
        image: "https://images.unsplash.com/photo-1558640476-437a2b943732",
        category: "paint"
    },
    {
        id: 3,
        name: "Bosch Drill Machine",
        price: 3499,
        image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd",
        category: "hardware"
    },
    {
        id: 4,
        name: "Stanley Tool Kit",
        price: 1999,
        image: "https://images.unsplash.com/photo-1584735422182-6eafd36c57a2",
        category: "hardware"
    },
    {
        id: 5,
        name: "Jaquar Wash Basin",
        price: 2999,
        image: "https://images.unsplash.com/photo-1600566752225-3f0871d7cff6",
        category: "sanitary"
    },
    {
        id: 6,
        name: "Hindware Commode",
        price: 5999,
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
        category: "sanitary"
    },
    {
        id: 7,
        name: "Ambuja Cement",
        price: 399,
        image: "https://images.unsplash.com/photo-1611270632128-4c8d7b0b9b0a",
        category: "cement"
    },
    {
        id: 8,
        name: "TMT Rebar",
        price: 75,
        image: "https://images.unsplash.com/photo-1581093196276-63559b5a3a8f",
        category: "cement"
    }
];

// DOM Elements
const productGrid = document.querySelector('.product-grid');
const cartCount = document.querySelector('.cart-count');
const categoryTabs = document.querySelectorAll('.category-tab');
let currentCategory = 'all';

// Cart functionality
let cart = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    setupEventListeners();
    
    // Highlight current page in navigation
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Display products based on category
function displayProducts() {
    productGrid.innerHTML = '';
    
    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(product => product.category === currentCategory);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">₹${product.price.toLocaleString()}</div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add to cart function
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showCartNotification(product.name);
}

// Update cart count in header
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Show notification when item is added to cart
function showCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <p>${productName} added to cart!</p>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    document.querySelector('.hamburger')?.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('show');
    });
    
    // Category tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.dataset.category;
            displayProducts();
        });
    });
    
    // Add notification styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 15px 25px;
            border-radius: 4px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}
