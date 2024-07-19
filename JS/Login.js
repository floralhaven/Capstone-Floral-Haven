document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form'); 

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
                    console.log('User logged in, redirecting to profile'); // Debug log
                    window.location.href = 'Profile.html'; // Redirect to profile page
                } else {
                    alert('Login failed: ' + data.message);
                }
            })            
            .catch(error => {
                console.error('Error during login:', error);
            });
        });
    }
});
