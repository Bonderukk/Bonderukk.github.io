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

        const phonePrefix = document.querySelector('input[name="phone-prefix"]');
        const phoneNumber = document.querySelector('input[name="phone-number"]');

        phonePrefix.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^\d+]/g, '');
            if (this.value.length > 0 && this.value[0] !== '+') {
                this.value = '+' + this.value;
            }
            if (this.value.length > 4) {
                this.value = this.value.slice(0, 4);
            }
        });

        phoneNumber.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^\d]/g, '')
                             .replace(/(\d{3})(?=\d)/g, '$1 ')
                             .trim();
            if (this.value.length > 11) {
                this.value = this.value.slice(0, 11);
            }
        });

        // Modify the form submission event listener
        document.getElementById('contactForm').addEventListener('submit', function(event) {
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
    });

    document.querySelector('input[name="name"]').addEventListener('input', function(e) {
        this.value = this.value.replace(/[0-9]/g, '');
    });

    document.querySelector('input[name="phone"]').addEventListener('input', function(e) {
        // Remove any character that is not a digit, plus sign, or space
        this.value = this.value.replace(/[^0-9+\s]/g, '');
        
        // Replace multiple consecutive spaces with a single space
        this.value = this.value.replace(/\s+/g, ' ');
        
        // Trim leading and trailing spaces
        this.value = this.value.trim();
        
        // Limit the total length to 20 characters
        if (this.value.length > 20) {
            this.value = this.value.slice(0, 20);
        }
    });
