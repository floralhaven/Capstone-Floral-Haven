document.addEventListener('DOMContentLoaded', () => {
    fetchData('bees').then(data => {
      populateCards(data);
    });
});

function fetchData(category) {
    // Hardcoded data for now will replace with connection to a SQL db
    const data = {
      bees: [
        {
          commonName: "Armenian Basket Flowers",
          scientificName: "Centaurea macrocephala",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/IMG_1538-Centaurea_macrocephala.jpg/330px-IMG_1538-Centaurea_macrocephala.jpghttps://upload.wikimedia.org/wikipedia/commons/thumb/8/85/IMG_1538-Centaurea_macrocephala.jpg/330px-IMG_1538-Centaurea_macrocephala.jpg",
          safety: { cats: "Safe", dogs: "Moderately Safe" }
        },
        {
            commonName: "Calamintha",
            scientificName: "Calamintha nepeta",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Clinopodium_vulgare01.jpg/330px-Clinopodium_vulgare01.jpg",
            safety: { cats: "Moderately Safe", dogs: "Safe" }
          },        {
            commonName: "Evergreen Candytuf",
            scientificName: "Iberis sempervirens",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Iberis_sempervirens.JPG/330px-Iberis_sempervirens.JPG",
            safety: { cats: "Safe", dogs: "Moderately Safe" }
          }
      ]
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
      <h3>Common Name: ${data.commonName}</h3>
      <p>Scientific Name: <i>${data.scientificName}</i></p>
      <div class="safety-info">
        <span><strong>Cats:</strong> ${data.safety.cats}</span>
        <span><strong>Dogs:</strong> ${data.safety.dogs}</span>
      </div>
    `;
    return card;
}