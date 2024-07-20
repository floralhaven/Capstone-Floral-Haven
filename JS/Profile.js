document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const userId = sessionStorage.getItem('userId'); // Assuming you store userId

    if (!token || !userId) {
        alert('User not logged in');
        window.location.href = 'Login.html'; // Correct path
        return;
    }

    fetchLayouts(); // Fetch and display layouts

    document.getElementById('logoutbtn').addEventListener('click', logout); // Correct ID
});

function fetchLayouts() {
    const userId = sessionStorage.getItem('userId'); // Assuming you store userId
    const token = localStorage.getItem('token');

    fetch(`http://localhost:3000/data/layouts/${userId}`, { // Updated endpoint
        headers: {
            'Authorization': `Bearer ${token}` // Include JWT in header
        }
    })
    .then(response => response.json())
    .then(layouts => {
        console.log('User layouts:', layouts);
        // Render layouts on the page
        const layoutsContainer = document.getElementById('layouts');
        layoutsContainer.innerHTML = ''; // Clear previous layouts
        layouts.forEach(layout => {
            const layoutDiv = document.createElement('div');
            layoutDiv.innerHTML = `<h3>${layout.name}</h3>`;
            layoutsContainer.appendChild(layoutDiv);
        });
    })
    .catch(error => {
        console.error('Error fetching layouts:', error);
    });
}

function logout() {
    fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Logout successful') {
            localStorage.removeItem('token');
            sessionStorage.removeItem('userId');
            window.location.href = 'Login.html'; // Correct path
        } else {
            alert('Logout failed');
        }
    })
    .catch(error => {
        console.error('Error during logout:', error);
    });
}
