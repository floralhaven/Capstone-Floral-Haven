const baseUrl = "http://98.81.223.161:3000/";

document.addEventListener('DOMContentLoaded', () => {
    const category = document.title.toLowerCase().includes('hummingbirds') ? 'hummingbirds' :
        document.title.toLowerCase().includes('bees') ? 'bees' :
            document.title.toLowerCase().includes('bats') ? 'bats' :
                document.title.toLowerCase().includes('butterflies') ? 'butterflies' : '';

    if (category) {
        fetchData(category).then(data => {
            populateCards(data, category);
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }
});

async function fetchData(category) {
    try {
        const response = await fetch(`${baseUrl}data/${category}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function populateCards(dataArray, collection) {
    const cardContainer = document.getElementById('plant-container');
    cardContainer.innerHTML = ''; // Clear existing cards
    dataArray.forEach(data => {
        const card = createCard(data, collection);
        cardContainer.appendChild(card);
    });
}

function createCard(data, collection) {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = data.image;
    img.alt = data.commonName;
    card.appendChild(img);

    const commonName = document.createElement('h2');
    commonName.textContent = `${data.commonName}`;
    card.appendChild(commonName);

    const scientificName = document.createElement('p');
    scientificName.textContent = `Scientific Name: ${data.scientificName}`;
    card.appendChild(scientificName);

    const safetyCats = document.createElement('p');
    safetyCats.textContent = `Safety for Cats: ${data.safety.cats}`;
    card.appendChild(safetyCats);

    const safetyDogs = document.createElement('p');
    safetyDogs.textContent = `Safety for Dogs: ${data.safety.dogs}`;
    card.appendChild(safetyDogs);

    // Add heart button
    const heartLabel = document.createElement('label');
    heartLabel.className = 'add-fav';

    const heartInput = document.createElement('input');
    heartInput.type = 'checkbox';
    heartInput.addEventListener('change', (event) => handleHeartClick(event, data, collection));

    const heartIcon = document.createElement('i');
    heartIcon.className = 'icon-heart';
    heartIcon.innerHTML = '♥';

    heartLabel.appendChild(heartInput);
    heartLabel.appendChild(heartIcon);
    card.appendChild(heartLabel);

    return card;
}

function handleHeartClick(event, plantData, collection) {
    const checkbox = event.target;
    const username = sessionStorage.getItem('loggedInUser');

    if (!username) {
        console.error('User not logged in');
        return;
    }

    const isFavorited = checkbox.checked;

    fetch(`${baseUrl}user/${username}/favorites`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            plantId: plantData._id,
            commonName: plantData.commonName,
            scientificName: plantData.scientificName,
            safety: plantData.safety,
            image: plantData.image,
            collection, // Add collection name to request
            favorited: isFavorited
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Favorite status updated:', data);
        })
        .catch(error => {
            console.error('Error updating favorite status:', error);
        });
}