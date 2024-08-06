document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const thankYouMessage = document.getElementById('thankYouMessage');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;
        const requiredFields = form.querySelectorAll('input[required], textarea[required]');

        requiredFields.forEach(field => {
            if (!field.value) {
                isValid = false;
                field.style.borderColor = 'red';
            } else {
                field.style.borderColor = '';
            }
        });

        if (isValid) {
            form.style.display = 'none';
            thankYouMessage.style.display = 'block';
        } else {
            alert('Please fill out all required fields.');
        }
    });
});