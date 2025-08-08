document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('thankYouModal');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); 
    
        const emailInput = document.getElementById('email');
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!emailRegex.test(emailValue)) {
            alert("Please enter a valid email address.");
            return;
        }

        const formData = new FormData(form);

        fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(responseData => {
            modal.style.display = 'block';

            // Reset the form
            form.reset();

            setTimeout(() => {
                modal.style.display = 'none';
            }, 3000);
        }).catch(error => {
            alert("There was a problem submitting your form. Please try again later.");
            console.error("Formspree Error:", error);
        });
    });
});


