// Check URL for status parameter
const urlParams = new URLSearchParams(window.location.search);
const formStatus = urlParams.get('status');
const notification = document.getElementById('notification');

if (formStatus === 'success') {
    notification.textContent = 'Formulár bol úspešne odoslaný!';
    notification.style.backgroundColor = 'green';
    notification.style.color = 'white';
} else if (formStatus === 'error') {
    notification.textContent = 'Pri odosielaní formulára došlo k chybe.';
    notification.style.backgroundColor = 'red';
    notification.style.color = 'white';
}

// Optionally, hide the notification after a few seconds
if (formStatus) {
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}
