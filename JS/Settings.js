document.addEventListener('DOMContentLoaded', function() {
    const formElement = document.getElementById('changePasswordForm');
    const userIdField = document.getElementById('userId');

    // Get the user ID from sessionStorage
    const userId = sessionStorage.getItem('loggedInUser');
    if (userId && /^[0-9a-fA-F]{24}$/.test(userId)) {
        userIdField.value = userId;
    } else {
        console.error('Invalid or missing User ID in sessionStorage.');
        alert('Error: Unable to retrieve user ID.');
        return;
    }

    if (formElement) {
        formElement.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const oldPassword = document.getElementById('oldpassword').value;
            const newPassword = document.getElementById('newpassword').value;
            const userId = userIdField.value;

            if (!oldPassword || !newPassword || !userId) {
                alert('Please fill out all fields and make sure you are logged in.');
                return;
            }

            fetch('https://chelseabui11.github.io/Capstone-Floral-Haven-API/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    oldpassword: oldPassword,
                    newpassword: newPassword,
                    userId: userId // Include userId from hidden field in the request body
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Password changed successfully') {
                    alert('Password changed successfully');
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
