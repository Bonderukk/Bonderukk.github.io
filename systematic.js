document.addEventListener('DOMContentLoaded', () => {
    // Existing intersection observer code
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            } else {
                entry.target.classList.remove('reveal');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    // Existing element observations
    document.querySelectorAll('.content-image').forEach((image) => {
        observer.observe(image);
    });
    
    document.querySelectorAll('.content-grid p').forEach((paragraph) => {
        observer.observe(paragraph);
    });

    document.querySelectorAll('.content-text p').forEach((paragraph) => {
        observer.observe(paragraph);
    });

    // New hamburger menu code
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Add active class to current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelector(`nav ul li a[href="${currentPage}"]`)?.classList.add('active');
});