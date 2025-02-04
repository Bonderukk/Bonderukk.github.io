window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const body = document.querySelector("body");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "auto";
    });

    // Close menu when clicking a link
    document.querySelectorAll(".nav-menu li a").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        body.style.overflow = "auto";
    }));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add animate class when element comes into view
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                // Remove animate class when element is out of view
                entry.target.classList.remove('animate');
            }
        });
    }, {
        threshold: 0.1 // Triggers when at least 10% of the element is visible
    });

    // Observe all list items
    document.querySelectorAll('.benefits-content li').forEach(item => {
        observer.observe(item);
    });
}); 