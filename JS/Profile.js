const baseUrl = "http://18.232.160.182:3000/";

document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logoutbtn');

    if (logoutButton) {
        logoutButton.addEventListener('click', function (event) {
            event.preventDefault();
            // Clear session storage to log out the user
            sessionStorage.removeItem('loggedInUser');
            // Redirect to the home page
            window.location.href = 'index.html';
        });
    }

    // Load favorites on DOM content loaded
    if (checkLoggedIn()) {
        loadFavorites();
    }

    function checkLoggedIn() {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        console.log('Logged in user:', loggedInUser);
        return loggedInUser !== null;
    }

    async function loadFavorites() {
        const username = sessionStorage.getItem('loggedInUser');

        if (!username) {
            console.error('User not logged in');
            return;
        }

        console.log('Fetching favorites for user:', username);

        try {
            const response = await fetch(`${baseUrl}user/${username}/favorites`);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const user = await response.json();
            console.log('Fetched user data:', user);
            displayFavorites(user.favorites);
        } catch (error) {
            console.error('Error fetching favorite plants:', error);
        }
    }

    function displayFavorites(favorites) {
        const likedPlantsContainer = document.querySelector('.likedplants');
        likedPlantsContainer.innerHTML = ''; // Clear existing plants
    
        if (!favorites || favorites.length === 0) {
            likedPlantsContainer.innerHTML = '<p>No favorite plants found.</p>';
            return;
        }
    
        favorites.forEach(favorite => {
            const plantDiv = document.createElement('div');
            plantDiv.className = 'likedplant';

            const nameElement = document.createElement('p');
            nameElement.textContent = `${favorite.commonName} (${favorite.collection})`; // Use favorite here
            plantDiv.appendChild(nameElement);
    
            const plantImage = document.createElement('img');
            plantImage.src = favorite.image;
            plantImage.alt = favorite.commonName;
            plantDiv.appendChild(plantImage);
    
            const unfavoriteButton = document.createElement('span');
            unfavoriteButton.textContent = 'Unfavorite';
            unfavoriteButton.className = 'unfavorite-btn';
            unfavoriteButton.addEventListener('click', () => handleUnfavorite(favorite.plantId));
            plantDiv.appendChild(unfavoriteButton);
    
            likedPlantsContainer.appendChild(plantDiv);
        });
    }    
    
    function handleUnfavorite(plantId) {
        const username = sessionStorage.getItem('loggedInUser');
        if (!username) {
            alert('You must be logged in to unfavorite plants.');
            return;
        }
    
        fetch(`${baseUrl}user/${username}/favorites/${plantId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Plant removed from favorites') {
                loadFavorites(); // Refresh the list of favorites
            } else {
                alert('Error removing plant from favorites');
            }
        })
        .catch(error => console.error('Error:', error));
    }    
});