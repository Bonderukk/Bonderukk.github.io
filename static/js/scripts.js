document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
    const confirmBooking = document.getElementById('confirmBooking');
    const birthdateInput = document.getElementById('birthdate');
    const ageInput = document.getElementById('age');
    const facilitySelect = document.getElementById('facility');
    const sportSelect = document.getElementById('sport');
    const equipmentSelect = document.getElementById('equipment');
    const otherCheckbox = document.getElementById('other');
    const otherServiceInput = document.getElementById('otherService');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');

    // Calculate age based on birthdate
    birthdateInput.addEventListener('change', function() {
        const birthdate = new Date(this.value);
        const today = new Date();
        let age = today.getFullYear() - birthdate.getFullYear();
        const monthDiff = today.getMonth() - birthdate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }
        
        ageInput.value = age >= 0 ? age : '';
    });

    // Cascading dropdowns
    const sportOptions = {
        indoor: ['Basketball', 'Volleyball', 'Badminton'],
        outdoor: ['Football', 'Tennis', 'Athletics']
    };

    const equipmentOptions = {
        Basketball: ['Basketball', 'Hoop'],
        Volleyball: ['Volleyball', 'Net'],
        Badminton: ['Racket', 'Shuttlecock'],
        Football: ['Football', 'Goal'],
        Tennis: ['Tennis Racket', 'Tennis Ball'],
        Athletics: ['Javelin', 'Shot Put']
    };

    facilitySelect.addEventListener('change', function() {
        sportSelect.innerHTML = '<option value="">Select Sport</option>';
        equipmentSelect.innerHTML = '<option value="">Select Equipment</option>';
        if (this.value) {
            sportOptions[this.value].forEach(sport => {
                const option = document.createElement('option');
                option.value = sport;
                option.textContent = sport;
                sportSelect.appendChild(option);
            });
        }
    });

    sportSelect.addEventListener('change', function() {
        equipmentSelect.innerHTML = '<option value="">Select Equipment</option>';
        if (this.value) {
            equipmentOptions[this.value].forEach(equipment => {
                const option = document.createElement('option');
                option.value = equipment;
                option.textContent = equipment;
                equipmentSelect.appendChild(option);
            });
        }
    });

    // Show/hide other service input
    otherCheckbox.addEventListener('change', function() {
        otherServiceInput.style.display = this.checked ? 'block' : 'none';
    });

    // Form submission and modal display
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            displaySummary();
            modal.style.display = 'block';
        }
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    confirmBooking.addEventListener('click', function() {
        // Here you would typically send the form data to a server
        alert('Booking confirmed!');
        modal.style.display = 'none';
        form.reset();
    });

    emailInput.addEventListener('input', validateEmail);

    function validateEmail() {
        const email = emailInput.value;
        const emailRegex = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address (e.g., user@example.com)';
            emailInput.setCustomValidity('Invalid email format');
        } else {
            emailError.textContent = '';
            emailInput.setCustomValidity('');
        }
    }

    // Update the validateForm function
    function validateForm() {
        let isValid = true;
        const errorMessages = document.querySelectorAll('.error');
        errorMessages.forEach(error => error.textContent = '');

        const inputs = document.querySelectorAll('input[type="text"], input[type="number"], input[type="email"], input[type="tel"], textarea');
        inputs.forEach(input => {
            if (input.required && !input.value) {
                showError(input, 'Toto pole je povinné');
                isValid = false;
            } else if (input.type === 'email' && !validateEmail(input.value)) {
                showError(input, 'Zadajte platnú e-mailovú adresu');
                isValid = false;
            } else if (input.type === 'tel' && !validatePhone(input.value)) {
                showError(input, 'Zadajte platné telefónne číslo');
                isValid = false;
            }
        });

        return isValid;
    }

    function displaySummary() {
        const summary = document.getElementById('summary');
        const selectedServices = Array.from(form.services)
            .filter(service => service.checked)
            .map(service => {
                const price = document.getElementById(`${service.id}Price`).value;
                return `${service.value} (€${price})`;
            });
        
        let servicesText = selectedServices.length > 0 ? selectedServices.join(', ') : 'Žiadne';
        if (form.other.checked && form.otherService.value) {
            servicesText += `, ${form.otherService.value} (€${form.otherPrice.value})`;
        }

        const facilityPrice = parseFloat(form.facilityPrice.value) || 0;
        const equipmentPrice = parseFloat(form.equipmentPrice.value) || 0;
        const servicesPrice = selectedServices.reduce((total, service) => {
            const price = parseFloat(document.getElementById(`${service.split(' ')[0].toLowerCase()}Price`).value) || 0;
            return total + price;
        }, 0);

        const totalPrice = facilityPrice + equipmentPrice + servicesPrice;

        summary.innerHTML = `
            <p><strong>Meno:</strong> ${form.name.value} ${form.surname.value}</p>
            <p><strong>Pohlavie:</strong> ${form.gender.value}</p>
            <p><strong>Dátum narodenia:</strong> ${form.birthdate.value}</p>
            <p><strong>Vek:</strong> ${form.age.value}</p>
            <p><strong>E-mail:</strong> ${form.email.value}</p>
            <p><strong>Telefón:</strong> ${form.phonePrefix.value}${form.phone.value}</p>
            <p><strong>Zariadenie:</strong> ${form.facility.value} (€${facilityPrice})</p>
            <p><strong>Šport:</strong> ${form.sport.value}</p>
            <p><strong>Vybavenie:</strong> ${form.equipment.value} (€${equipmentPrice})</p>
            <p><strong>Dodatočné služby:</strong> ${servicesText}</p>
            <p><strong>Komentáre:</strong> ${form.comments.value || 'Žiadne'}</p>
        `;

        document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
    }

    // Add this to your existing JavaScript file

    const revealNameBtn = document.getElementById('revealNameBtn');
    const hiddenNameInput = document.getElementById('hiddenName');

    revealNameBtn.addEventListener('click', function() {
        if (hiddenNameInput.style.display === 'none') {
            hiddenNameInput.style.display = 'inline-block';
            revealNameBtn.textContent = 'Hide Name';
        } else {
            hiddenNameInput.style.display = 'none';
            revealNameBtn.textContent = 'Reveal Hidden Name';
        }
    });

    // Add character count for text and number inputs
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"], input[type="email"], input[type="tel"], textarea');
    inputs.forEach(input => {
        const maxLength = input.getAttribute('maxlength');
        if (maxLength) {
            const charCount = document.createElement('span');
            charCount.className = 'char-count';
            input.parentNode.appendChild(charCount);
            
            input.addEventListener('input', function() {
                charCount.textContent = `${this.value.length} / ${maxLength}`;
            });
        }
    });

    // Enable/disable price inputs based on checkbox state
    const serviceCheckboxes = document.querySelectorAll('input[type="checkbox"][name="services"]');
    serviceCheckboxes.forEach(checkbox => {
        const priceInput = document.getElementById(`${checkbox.id}Price`);
        checkbox.addEventListener('change', function() {
            priceInput.disabled = !this.checked;
            if (!this.checked) {
                priceInput.value = '';
            }
        });
    });

    function showError(input, message) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.className === 'error') {
            errorElement.textContent = message;
        }
        input.style.borderColor = 'red';
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^\d{9}$/;  // Assumes 9-digit phone number
        return re.test(phone);
    }
});