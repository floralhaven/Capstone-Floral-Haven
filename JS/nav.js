document.addEventListener('DOMContentLoaded', function() {
    updateNavbar(); 

    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', function() {
            sessionStorage.removeItem('loggedInUser'); 
            updateNavbar(); // Update navbar links after logout
        });
    }

    function updateNavbar() {
        const isLoggedIn = checkLoggedIn(); 

        document.getElementById('signupLink').style.display = isLoggedIn ? 'none' : 'inline'; 
        document.getElementById('loginLink').style.display = isLoggedIn ? 'none' : 'inline'; 
        document.getElementById('profileLink').style.display = isLoggedIn ? 'inline' : 'none'; 
        document.getElementById('guestProfileLink').style.display = isLoggedIn ? 'none' : 'inline'; 
    }

    function checkLoggedIn() {
        return sessionStorage.getItem('loggedInUser') !== null;
    }
});
