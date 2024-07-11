document.addEventListener('DOMContentLoaded', () => {
    fetchData('hummingbirds').then(data => {
        populateCards(data);
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
});

async function fetchData(category) {
    try {
        const response = await fetch(`/data/${category}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function populateCards(dataArray) {
    const cardContainer = document.getElementById('plant-container');
    cardContainer.innerHTML = ''; // Clear existing cards
    dataArray.forEach(data => {
        const card = createCard(data);
        cardContainer.appendChild(card);
    });
}

function createCard(data) {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = data.image;
    img.alt = data.commonName;
    card.appendChild(img);

    const commonName = document.createElement('h2');
    commonName.textContent = data.commonName;
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

    return card;
}