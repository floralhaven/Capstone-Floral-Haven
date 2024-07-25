document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        const userData = {
            email: email,
            username: username,
            password: password
        };

        try {
            const response = await fetch('https://chelseabui11.github.io/Capstone-Floral-Haven-API/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (response.ok) {
                sessionStorage.setItem('loggedInUser', userData.email);
                alert('Signed up successfully!');
                window.location.href = 'profile.html'; // Redirect to profile page after signup
            } else {
                alert(result.message || 'Sign up failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Sign up failed. Please try again.');
        }

        signupForm.reset(); // Reset the form fields after submission
    });
});