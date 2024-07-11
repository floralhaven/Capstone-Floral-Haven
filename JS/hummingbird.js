document.addEventListener('DOMContentLoaded', () => {
    fetchData('hummingbirds').then(data => {
        populateCards(data);
    });
});

function fetchData(category) {
    // Hardcoded data for now will replace with connection to a SQL db
    const data = {
        hummingbirds: []
    };
    return new Promise((resolve) => {
        resolve(data[category]);
    });
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
    card.innerHTML = `
      <img src="${data.image}" alt="${data.commonName}">
      <h3>Common Name: <br>${data.commonName}</h3>
      <p>Scientific Name: <br><i>${data.scientificName}</i></p>
      <div class="safety-info">
        <span><strong>Cats:</strong> ${data.safety.cats}</span> 
        <br>
        <span><strong>Dogs:</strong> ${data.safety.dogs}</span>
      </div>
    `;
    return card;
}