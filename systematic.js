// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add reveal class when element enters viewport
            entry.target.classList.add('reveal');
        } else {
            // Remove reveal class when element exits viewport
            entry.target.classList.remove('reveal');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all content images and paragraphs when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Observe images
    document.querySelectorAll('.content-image').forEach((image) => {
        observer.observe(image);
    });
    
    // Observe paragraphs in content-grid
    document.querySelectorAll('.content-grid p').forEach((paragraph) => {
        observer.observe(paragraph);
    });

    // Observe paragraphs in content-text
    document.querySelectorAll('.content-text p').forEach((paragraph) => {
        observer.observe(paragraph);
    });
});