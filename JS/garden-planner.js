let grid = Array(3).fill().map(() => Array(3).fill(''));

// Event listeners set up when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchLayouts(); // Fetch existing layouts on page load

    // Event listeners for buttons
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
    const token = localStorage.getItem('token'); // Retrieve the JWT from storage

    if (!token) {
        alert('User not logged in');
        return;
    }

    const layoutName = prompt('Enter layout name:');
    if (!layoutName) {
        alert('Layout name is required');
        return;
    }

    const layoutData = { name: layoutName, grid };

    fetch('http://localhost:3000/data/layouts', { // Updated endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the JWT in the Authorization header
        },
        body: JSON.stringify(layoutData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Layout saved successfully!') {
            console.log('Layout saved:', data);
            fetchLayouts(); // Refresh the layouts
        } else {
            alert('Failed to save layout: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error saving layout:', error);
    });
}

function fetchLayouts() {
    const userId = sessionStorage.getItem('userId'); // Assuming you store userId

    if (!userId) {
        alert('User not logged in');
        return;
    }

    fetch(`http://localhost:3000/data/layouts/${userId}`)
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