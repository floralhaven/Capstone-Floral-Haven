// const baseUrl = "https://chelseabui11.github.io/Capstone-Floral-Haven-API/";
const baseUrl = "http://localhost:3000/";

document.addEventListener('DOMContentLoaded', function() {
    const formElement = document.getElementById('changePasswordForm');

    // Get the username from sessionStorage
    const username = sessionStorage.getItem('loggedInUser');

    if (!username) {
        alert('Error: Unable to retrieve username. Please log in.');
        window.location.href = 'Login.html'; // Redirect to login if no username is found
        return;
    }

    if (formElement) {
        formElement.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const oldPassword = document.getElementById('oldpassword').value;
            const newPassword = document.getElementById('newpassword').value;

            if (!oldPassword || !newPassword) {
                alert('Please fill out all fields.');
                return;
            }

            fetch(`${baseUrl}change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    oldpassword: oldPassword,
                    newpassword: newPassword,
                    username: username // Include username in the request body
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Password changed successfully') {
                    alert('Password changed successfully');
                    window.location.href = 'Profile.html'; // Redirect to profile after successful password change
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error changing password:', error);
            });
        });
    } else {
        console.error('Element with ID "changePasswordForm" not found.');
    }
});
