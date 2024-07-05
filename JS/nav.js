document.addEventListener('DOMContentLoaded', function() {
    updateNavbar(); // Update navbar links on page load

    function updateNavbar() {
        const isLoggedIn = checkLoggedIn(); // Check if user is logged in

        if (isLoggedIn) {
            document.getElementById('signupLink').style.display = 'none'; // Hide signup link
            document.getElementById('loginLink').style.display = 'none'; // Hide login link
            document.getElementById('profileLink').style.display = 'inline'; // Show profile link
            document.getElementById('guestProfileLink').style.display = 'none'; // Hide guest profile link
        } else {
            document.getElementById('signupLink').style.display = 'inline'; // Show signup link
            document.getElementById('loginLink').style.display = 'inline'; // Show login link
            document.getElementById('profileLink').style.display = 'none'; // Hide profile link
            document.getElementById('guestProfileLink').style.display = 'inline'; // Show guest profile link
        }
    }

    // Function to check if user is logged in (example using sessionStorage)
    function checkLoggedIn() {
        return sessionStorage.getItem('loggedInUser') !== null;
    }
});
