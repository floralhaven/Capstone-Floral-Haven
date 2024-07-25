document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://chelseabui11.github.io/Capstone-Floral-Haven-API/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login successful') {
            sessionStorage.setItem('loggedInUser', username); // Store the username in session storage
            window.location.href = '/profile.html'; // Redirect to profile page after successful login
        } else {
            document.getElementById('error').style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error logging in:', error);
    });
});
