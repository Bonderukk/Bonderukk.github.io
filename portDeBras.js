document.addEventListener('DOMContentLoaded', () => {
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

    // Observe the title
    const title = document.querySelector('.portdebras-title');
    if (title) {
        observer.observe(title);
    }

    // Observe the paragraphs
    const paragraphs = document.querySelectorAll('.portdebras-text p');
    paragraphs.forEach(paragraph => {
        observer.observe(paragraph);
    });

    // Observe the logo
    const logo = document.querySelector('.portdebras-logo');
    if (logo) {
        observer.observe(logo);
    }

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