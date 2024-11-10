document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = "slideInFromLeft 1s ease forwards";
            }
        });
    });

    const text = document.querySelector('.institutes-text');
    if (text) {
        observer.observe(text);
    }

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelector(`nav ul li a[href="${currentPage}"]`)?.classList.add('active');
});

