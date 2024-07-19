document.getElementById('passwordchanger').addEventListener('submit', async function(event) {
    event.preventDefault();

    const oldpassword = document.getElementById('oldpassword').value;
    const newpassword = document.getElementById('newpassword').value;
    const userId = "user's userId"; // Replace this with the actual userId, possibly fetched from a session or token

    try {
        const response = await fetch('/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ oldpassword, newpassword, userId })
        });

        if (response.ok) {
            alert('Password changed successfully');
        } else {
            const result = await response.json();
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        alert('Error changing password');
    }
});