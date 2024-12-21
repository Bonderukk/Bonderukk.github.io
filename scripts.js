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

        // Add null checks for phone inputs
        const phonePrefix = document.querySelector('input[name="phone-prefix"]');
        const phoneNumber = document.querySelector('input[name="phone-number"]');

        if (phonePrefix) {
            phonePrefix.addEventListener('input', function(e) {
                this.value = this.value.replace(/[^\d+]/g, '');
                if (this.value.length > 0 && this.value[0] !== '+') {
                    this.value = '+' + this.value;
                }
                if (this.value.length > 4) {
                    this.value = this.value.slice(0, 4);
                }
            });
        }

        if (phoneNumber) {
            phoneNumber.addEventListener('input', function(e) {
                this.value = this.value.replace(/[^\d]/g, '')
                                 .replace(/(\d{3})(?=\d)/g, '$1 ')
                                 .trim();
                if (this.value.length > 11) {
                    this.value = this.value.slice(0, 11);
                }
            });
        }

        // Add null check for form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                const name = document.querySelector('input[name="name"]').value;
                const email = document.querySelector('input[name="email"]').value;
                const phonePrefix = document.querySelector('input[name="phone-prefix"]').value;
                const phoneNumber = document.querySelector('input[name="phone-number"]').value;
                const subject = document.querySelector('input[name="subject"]').value;
                const message = document.querySelector('textarea[name="message"]').value;

                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const phonePrefixPattern = /^\+\d{3}$/;
                const phoneNumberPattern = /^\d{3} \d{3} \d{3}$/;

                if (!emailPattern.test(email)) {
                    alert('Please enter a valid email address.');
                    event.preventDefault();
                }

                if ((phonePrefix || phoneNumber) && (!phonePrefixPattern.test(phonePrefix) || !phoneNumberPattern.test(phoneNumber))) {
                    alert('Please enter a valid phone number.');
                    event.preventDefault();
                }

                if (name.length > 50 || subject.length > 30 || message.length > 300) {
                    alert('Please ensure all fields are within the specified length.');
                    event.preventDefault();
                }
            });
        }

        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Close menu when clicking a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        }
    });

    // Add null checks for name and phone inputs
    const nameInput = document.querySelector('input[name="name"]');
    if (nameInput) {
        nameInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[0-9]/g, '');
        });
    }

    const phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9+\s]/g, '');
            this.value = this.value.replace(/\s+/g, ' ');
            this.value = this.value.trim();
            
            if (this.value.length > 20) {
                this.value = this.value.slice(0, 20);
            }
        });
    }
