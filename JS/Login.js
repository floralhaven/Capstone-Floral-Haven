document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form'); // Ensure correct ID

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    sessionStorage.setItem('loggedInUser', data.userId); // Store user ID
                    window.location.href = 'Profile.html'; // Redirect to profile page
                } else {
                    console.error('Login failed:', data.message); // Use console instead of alert
                }
            })
            .catch(error => {
                console.error('Error during login:', error);
            });
        });
    }
});
