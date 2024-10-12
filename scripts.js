// Add this at the beginning of your existing code
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', function() {
    // Store the scroll position before refresh
    window.addEventListener('beforeunload', function() {
        sessionStorage.setItem('scrollPosition', window.pageYOffset);
    });

    // Restore the scroll position after refresh
    if (sessionStorage.getItem('scrollPosition') !== null) {
        window.scrollTo(0, parseInt(sessionStorage.getItem('scrollPosition')));
    }

    const contactLink = document.querySelector('a[href="#contact"]');

    // Smooth scroll for contact link
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const startPosition = window.pageYOffset;
            const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
            const distance = targetPosition - startPosition;
            const duration = 1000; // Adjust this value to control scroll speed (in milliseconds)
            let start = null;

            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);
                window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            }

            function easeInOutCubic(t) {
                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            }

            window.requestAnimationFrame(step);
        });
    }

    // New code for story boxes animation
    const storyBoxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('left-box')) {
                    entry.target.classList.add('left-box-animation');
                } else if (entry.target.classList.contains('middle-box')) {
                    entry.target.classList.add('middle-box-animation');
                } else if (entry.target.classList.contains('right-box')) {
                    entry.target.classList.add('right-box-animation');
                }
            } else {
                entry.target.classList.remove('left-box-animation', 'middle-box-animation', 'right-box-animation');
            }
        });
    }, {
        threshold: 0.1 // Adjust this value to control when the animation triggers
    });

    // Observe each story box
    document.querySelectorAll('.story-box').forEach(box => {
        storyBoxObserver.observe(box);
    });

    // Existing square animation code
    const squareObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const square = entry.target.querySelector('.square');
            if (entry.isIntersecting) {
                square.classList.add('square-animation');
            } else {
                square.classList.remove('square-animation');
            }
        });
    });
  
    const squareWrapper = document.querySelector('.square-wrapper');
    if (squareWrapper) {
        squareObserver.observe(squareWrapper);
    }
});
