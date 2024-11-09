// Intersection Observer for images
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add reveal class when image enters viewport
            entry.target.classList.add('reveal');
        } else {
            // Remove reveal class when image exits viewport
            entry.target.classList.remove('reveal');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all content images when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.content-image').forEach((image) => {
        observer.observe(image);
    });
});