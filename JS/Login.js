document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginButton').addEventListener('click', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const loginData = {
            email: email,
            password: password
        };

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (data.success) {
                sessionStorage.setItem('loggedInUser', email);
                alert('Login successful!');
                window.location.href = 'profile.html'; // Redirect to profile page on successful login
            } else {
                alert(data.message); // Show error message on login failure
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while logging in.'); // Show error message on fetch failure
        }

        document.getElementById('login-form').reset(); // Reset the form fields
    });
});