document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = "slideInFromLeft 1s ease forwards";
            }
        });
    });

    const text = document.querySelector('.institutes-text');
    observer.observe(text);
});