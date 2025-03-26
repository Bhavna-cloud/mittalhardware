// ===== DOM Elements =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.main-nav');
const cartBtn = document.querySelector('.cart-btn');
const cartCount = document.querySelector('.cart-count');
const searchBtn = document.querySelector('.search-btn');
const productGrids = document.querySelectorAll('.product-grid, .product-list');
const addToCartBtns = document.querySelectorAll('.add-to-cart');

// ===== Global Variables =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', function() {
    // Highlight current page in navigation
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('.main-nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Update cart count on page load
    updateCartCount();
    
    // Initialize product interactions
    if (productGrids.length > 0) {
        initProductInteractions();
    }
});

// ===== Mobile Menu =====
mobileMenuBtn.addEventListener('click', function() {
    mainNav.classList.toggle('show');
    this.classList.toggle('open');
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-menu-btn')) {
        mainNav.classList.remove('show');
        mobileMenuBtn.classList.remove('open');
    }
});

// ===== Cart Functionality =====
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    localStorage.setItem('cart', JSON.stringify(cart));
}

function initProductInteractions() {
    // Add to cart functionality
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.dataset.id;
            const productName = this.dataset.name;
            const productPrice = parseFloat(this.dataset.price);
            
            addToCart(productId, productName, productPrice);
            showNotification(`${productName} added to cart!`);
        });
    });
}

function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id,
            name,
            price,
            quantity: 1
        });
    }
    
    updateCartCount();
}

// ===== Notification System =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `<p>${message}</p>`;
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

// ===== Search Functionality =====
searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    // Implement search functionality here
    console.log('Search clicked');
});

// ===== Add styles for notification =====
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--secondary);
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
    
    .mobile-menu-btn.open i::before {
        content: '\\f00d';
    }
`;
document.head.appendChild(style);
