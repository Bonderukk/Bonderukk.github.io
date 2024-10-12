// Add this at the beginning of your existing code
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

    // Modify the story box animation code
    const storyBoxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                if (window.innerWidth <= 844) {  // For smaller screens, including iPhone 12 Pro
                    entry.target.classList.add('fadeInUp');
                } else {
                    if (entry.target.classList.contains('left-box')) {
                        entry.target.classList.add('left-box-animation');
                    } else if (entry.target.classList.contains('middle-box')) {
                        entry.target.classList.add('middle-box-animation');
                    } else if (entry.target.classList.contains('right-box')) {
                        entry.target.classList.add('right-box-animation');
                    }
                }
            } else {
                entry.target.style.opacity = '0';
                entry.target.classList.remove('left-box-animation', 'middle-box-animation', 'right-box-animation', 'fadeInUp');
            }
        });
    }, {
        threshold: 0.1
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

    // Add this to your existing JavaScript
    document.addEventListener('DOMContentLoaded', function() {
        const headerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-50px 0px -50px 0px'  // Trigger earlier
        });

        // Observe each header with the 'slide-in-right' class
        document.querySelectorAll('.slide-in-right').forEach(header => {
            headerObserver.observe(header);
        });
    });
