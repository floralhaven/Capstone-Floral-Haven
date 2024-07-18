let grid = Array(3).fill().map(() => Array(3).fill(''));
let userId = sessionStorage.getItem('loggedInUserId'); // Store userId

document.addEventListener('DOMContentLoaded', () => {
    userId = sessionStorage.getItem('loggedInUserId'); // Retrieve userId
    fetchLayouts(); // Fetch existing layouts on page load

    document.getElementById('addPlantButton').addEventListener('click', addPlant);
    document.getElementById('saveLayoutButton').addEventListener('click', saveLayout);
});

function addPlant() {
    const plantName = document.getElementById('plant-name').value;
    const collection = document.getElementById('collection-select').value; // Get the selected collection

    fetch(`http://localhost:3000/data/${collection}?commonName=${plantName}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const img = document.createElement('img');
                img.src = data[0].image; // Use the correct field name for the image
                img.alt = plantName;
                img.classList.add('grid-plant');

                // Find the first empty cell in the grid
                for (let i = 0; i < grid.length; i++) {
                    for (let j = 0; j < grid[i].length; j++) {
                        if (grid[i][j] === '') {
                            grid[i][j] = data[0].image;
                            const cellDiv = document.querySelector(`.grid-item[data-row="${i}"][data-col="${j}"]`);
                            cellDiv.innerHTML = '';
                            cellDiv.appendChild(img);
                            return;
                        }
                    }
                }
                alert('The garden planner is full. Please save your layout or remove a plant to add more.');
            } else {
                alert('Plant not found');
            }
        })
        .catch(error => {
            console.error('Error fetching plant data:', error);
        });
}

function saveLayout() {
    userId = sessionStorage.getItem('loggedInUserId'); // Retrieve userId again before saving

    if (!userId) {
        alert('User not logged in');
        return;
    }

    const layoutName = prompt('Enter layout name:');
    fetch(`/user/${userId}/layout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: layoutName, grid })
    }).then(response => response.json())
        .then(data => {
            console.log('Layout saved:', data);
        });
}

function fetchLayouts() {
    userId = sessionStorage.getItem('loggedInUserId'); // Retrieve userId again before fetching layouts

    if (!userId) {
        alert('User not logged in');
        return;
    }

    fetch(`/user/${userId}/layouts`)
        .then(response => response.json())
        .then(layouts => {
            console.log('User layouts:', layouts);
            // Render layouts on the page
            layouts.forEach(layout => {
                const layoutDiv = document.createElement('div');
                layoutDiv.innerHTML = `<h3>${layout.name}</h3>`;
                document.getElementById('layouts').appendChild(layoutDiv);
            });
        });
}