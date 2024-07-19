document.addEventListener('DOMContentLoaded', function() {
    const profileButton = document.getElementById('profileButton');
    const logoutButton = document.getElementById('logoutbtn');

    if (profileButton) {
        profileButton.addEventListener('click', function(event) {
            event.preventDefault();
            // Check if user is logged in
            fetch('/check-session', { method: 'GET' }) // Implement this endpoint on the server
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
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();
            fetch('/logout', { method: 'POST' })
                .then(response => response.json())
                .then(result => {
                    if (result.message === 'Logout successful') {
                        sessionStorage.removeItem('loggedInUser'); // Clear session storage
                        window.location.href = 'index.html'; // Redirect to home page
                    } else {
                        console.error('Logout failed:', result.message); // Use console instead of alert
                    }
                })
                .catch(error => {
                    console.error('Error logging out:', error);
                });
        });
    }
});