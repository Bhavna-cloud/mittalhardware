// Mobile menu toggle for smaller screens
document.addEventListener('DOMContentLoaded', function() {
    // Highlight current page in navigation
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Simple console log to confirm script is working
    console.log('MITTAL Hardware website loaded');
});
