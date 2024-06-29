document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitButton').addEventListener('click', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const newUser = { email, password }; // Note: Hash password during 3rd week

        // Fetch existing users from the JSON file
        fetch('../../Data/user.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(users => {
                // Check if users is not an array, initialize it
                if (!Array.isArray(users)) {
                    users = [];
                }

                // Check if the user already exists
                const userExists = users.some(user => user.email === email);
                if (userExists) {
                    alert('You already have an account.');
                    return;
                }

                // Add the new user
                users.push(newUser);

                // Update the JSON file (simulate writing to JSON file)
                return fetch('../../Data/user.json', {
                    method: 'PUT', // Use PUT method for updating data (simulated)
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(users),
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update user data');
                }
                alert('User data updated successfully!');
                // Optionally, clear the form
                document.getElementById('signupForm').reset();
            })
            .catch(error => {
                console.error('Error adding user or issue with network:', error.message);
                alert('Error adding user or issue with network.');
            });
    });
});