document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginButton').addEventListener('click', function(event) {
        event.preventDefault();

        // Capture form data
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Create a data object
        const loginData = {
            email: email,
            password: password
        };

        // Send data to the Node.js server for login verification
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                sessionStorage.setItem('loggedInUser', email);
                window.location.href = "../profile/profile.html";
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while logging in.');
        });

        document.getElementById('login-form').reset();
    });
});
