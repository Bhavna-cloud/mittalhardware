// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('show');
            this.classList.toggle('open');
        });
    }
    
    // Highlight current page in navigation
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('.main-nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-menu-btn')) {
            mainNav.classList.remove('show');
            mobileMenuBtn?.classList.remove('open');
        }
    });
    
    // Add styles for mobile menu icon toggle
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-btn.open i::before {
            content: '\\f00d';
        }
    `;
    document.head.appendChild(style);
});
