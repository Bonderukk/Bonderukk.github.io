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
}); 