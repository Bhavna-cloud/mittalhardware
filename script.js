// Sample product data
const products = [
    {
        id: 1,
        name: "Cordless Drill Driver",
        price: 89.99,
        originalPrice: 119.99,
        image: "https://via.placeholder.com/300x300?text=Cordless+Drill",
        rating: 4,
        badge: "Sale"
    },
    {
        id: 2,
        name: "Adjustable Wrench Set",
        price: 24.99,
        originalPrice: 29.99,
        image: "https://via.placeholder.com/300x300?text=Wrench+Set",
        rating: 5,
        badge: "Popular"
    },
    {
        id: 3,
        name: "Heavy Duty Hammer",
        price: 15.99,
        image: "https://via.placeholder.com/300x300?text=Hammer",
        rating: 4
    },
    {
        id: 4,
        name: "Screwdriver Set",
        price: 12.99,
        originalPrice: 16.99,
        image: "https://via.placeholder.com/300x300?text=Screwdriver+Set",
        rating: 3,
        badge: "Sale"
    },
    {
        id: 5,
        name: "Measuring Tape",
        price: 8.99,
        image: "https://via.placeholder.com/300x300?text=Measuring+Tape",
        rating: 4
    },
    {
        id: 6,
        name: "Safety Glasses",
        price: 5.99,
        image: "https://via.placeholder.com/300x300?text=Safety+Glasses",
        rating: 5
    }
];

// DOM Elements
const productGrid = document.querySelector('.product-grid');
const cartCount = document.querySelector('.cart-count');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Cart functionality
let cart = [];

// Display products
function displayProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        let badge = '';
        if (product.badge) {
            badge = `<div class="product-badge">${product.badge}</div>`;
        }
        
        let originalPrice = '';
        if (product.originalPrice) {
            originalPrice = `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>`;
        }
        
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= product.rating) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i - 0.5 <= product.rating) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        productCard.innerHTML = `
            <div class="product-image">
                ${badge}
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${originalPrice}
                </div>
                <div class="product-rating">
                    ${stars}
                </div>
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
    notification.className = 'cart-notification';
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

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    
    // Add cart notification styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .cart-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--secondary);
            color: white;
            padding: 15px 25px;
            border-radius: 4px;
            box-shadow: var(--shadow);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .cart-notification.show {
            transform: translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});
