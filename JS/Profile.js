document.addEventListener('DOMContentLoaded', function () {
    const profileButton = document.getElementById('profileButton');
    const logoutButton = document.getElementById('logoutbtn');

    if (profileButton) {
        profileButton.addEventListener('click', function (event) {
            event.preventDefault();
            // Check if user is logged in
            fetch('/check-session', { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                    if (data.loggedIn) {
                        window.location.href = 'profile.html';
                    } else {
                        window.location.href = 'guestprofile.html';
                    }
                })
                .catch(error => {
                    console.error('Error checking session:', error);
                });
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', function (event) {
            event.preventDefault();
            fetch('/logout', { method: 'POST' })
                .then(response => response.json())
                .then(result => {
                    if (result.message === 'Logout successful') {
                        sessionStorage.removeItem('loggedInUser');
                        window.location.href = 'index.html'; // Redirect to home page
                    } else {
                        alert('Logout failed');
                    }
                })
                .catch(error => {
                    console.error('Error logging out:', error);
                });

        });
    }
});