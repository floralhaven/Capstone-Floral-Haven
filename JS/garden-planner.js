let grid = Array(3).fill().map(() => Array(3).fill(''));

// Event listeners set up when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchLayouts(); // Fetch existing layouts on page load

    // Event listeners for buttons
    document.getElementById('addPlantButton').addEventListener('click', addPlant);
    document.getElementById('removePlantButton').addEventListener('click', removePlant);
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
                            grid[i][j] = plantName;
                            const cell = document.querySelector(`.grid-item[data-row="${i}"][data-col="${j}"]`);
                            if (cell) {
                                cell.appendChild(img);
                                return;
                            } else {
                                console.error(`Grid cell not found for row ${i}, col ${j}`);
                            }
                        }
                    }
                }
            } else {
                console.error('Plant not found in the database');
            }
        })
        .catch(error => {
            console.error('Error fetching plant data:', error);
        });
}

function removePlant() {
    const plantName = document.getElementById('plant-name').value;

    // Find the plant in the grid and remove it
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === plantName) {
                grid[i][j] = '';
                const cell = document.querySelector(`.grid-item[data-row="${i}"][data-col="${j}"]`);
                if (cell && cell.firstChild) {
                    cell.removeChild(cell.firstChild);
                    return;
                }
            }
        }
    }
}

function saveLayout() {
    const layoutName = document.getElementById('layout-name').value;
    const username = sessionStorage.getItem('loggedInUser'); // Get the username from session storage

    if (!username) {
        console.error('User not logged in');
        return;
    }

    fetch('http://localhost:3000/user/layout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            layoutName,
            layout: grid
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Layout saved successfully:', data);
            fetchLayouts(); // Refresh the layouts display after saving
        })
        .catch(error => {
            console.error('Error saving layout:', error);
        });
}

function fetchLayouts() {
    const username = sessionStorage.getItem('loggedInUser'); // Get the username from session storage

    if (!username) {
        console.error('User not logged in');
        return;
    }

    fetch(`http://localhost:3000/user/layouts?username=${username}`)
        .then(response => response.json())
        .then(data => {
            const savedLayoutsDiv = document.getElementById('saved-layouts');
            savedLayoutsDiv.innerHTML = ''; // Clear existing layouts

            data.forEach(layout => {
                const layoutDiv = document.createElement('div');
                layoutDiv.classList.add('saved-layout');
                layoutDiv.textContent = layout.layoutName;
                savedLayoutsDiv.appendChild(layoutDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching layouts:', error);
        });
}
