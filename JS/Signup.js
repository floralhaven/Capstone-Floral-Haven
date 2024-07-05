document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Retrieve form inputs
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validate password match (optional, but recommended)
        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        // Example: Save user data (you'll replace this with your own backend logic)
        signup(email, password);
    });

    function signup(email, password) {
        sessionStorage.setItem('loggedInUser', email);
        alert('Signed up successfully!');
        window.location.href = '../../profile/profile.html'; // Redirect to profile page after signup
    }
});