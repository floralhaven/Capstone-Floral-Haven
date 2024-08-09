const baseUrl = "https://floralhaven.github.io/Capstone-Floral-Haven-API/";

document.addEventListener('DOMContentLoaded', () => {
    const pageTitle = document.title.toLowerCase();
    if (pageTitle.includes('hummingbirds')) {
        loadHummingbirds();
    } else if (pageTitle.includes('bees')) {
        loadBees();
    } else if (pageTitle.includes('bats')) {
        loadBats();
    } else if (pageTitle.includes('butterflies')) {
        loadButterflies();
    }
});

function loadHummingbirds() {
    fetchData('hummingbirds')
        .then(data => populateCards(data, 'hummingbirds'))
        .catch(error => console.error('Error fetching hummingbirds data:', error));
}

function loadBees() {
    fetchData('bees')
        .then(data => populateCards(data, 'bees'))
        .catch(error => console.error('Error fetching bees data:', error));
}

function loadBats() {
    fetchData('bats')
        .then(data => populateCards(data, 'bats'))
        .catch(error => console.error('Error fetching bats data:', error));
}

function loadButterflies() {
    fetchData('butterflies')
        .then(data => populateCards(data, 'butterflies'))
        .catch(error => console.error('Error fetching butterflies data:', error));
}

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
        return null;
    }
}

function populateCards(dataArray, collection) {
    const cardContainer = document.getElementById('plant-container');
    cardContainer.innerHTML = ''; // Clear existing cards

    if (!dataArray || dataArray.length === 0) {
        const noDataMessage = document.createElement('p');
        noDataMessage.textContent = 'No data available.';
        cardContainer.appendChild(noDataMessage);
        return;
    }

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

    fetch(`${baseUrl}/user/${username}/favorites`, {
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
