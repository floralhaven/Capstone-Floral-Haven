document.addEventListener('DOMContentLoaded', function() {
    updateNavbar(); 

    document.getElementById('logoutLink').addEventListener('click', function() {
        sessionStorage.removeItem('loggedInUserId'); // Remove the correct key
        updateNavbar(); // Update navbar links after logout
    });

    function updateNavbar() {
        const isLoggedIn = checkLoggedIn(); 

        if (isLoggedIn) {
            document.getElementById('signupLink').style.display = 'none'; 
            document.getElementById('loginLink').style.display = 'none'; 
            document.getElementById('profileLink').style.display = 'inline'; 
            document.getElementById('guestProfileLink').style.display = 'none'; 
            document.getElementById('logoutLink').style.display = 'inline'; 
        } else {
            document.getElementById('signupLink').style.display = 'inline'; 
            document.getElementById('loginLink').style.display = 'inline'; 
            document.getElementById('profileLink').style.display = 'none'; 
            document.getElementById('guestProfileLink').style.display = 'inline'; 
            document.getElementById('logoutLink').style.display = 'none'; 
        }
    }

    function checkLoggedIn() {
        return sessionStorage.getItem('loggedInUserId') !== null; // Check the correct key
    }
});
