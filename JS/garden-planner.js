let grid = Array(3).fill().map(() => Array(3).fill(''));

// Event listeners set up when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchLayouts(); // Fetch existing layouts on page load

    // Event listeners for buttons
    document.getElementById('addPlantButton').addEventListener('click', addPlant);
    document.getElementById('removePlantButton').addEventListener('click', removePlant);
    document.getElementById('saveLayoutButton').addEventListener('click', saveLayout);
    document.getElementById('clearLayoutButton').addEventListener('click', clearGrid);
});

function addPlant() {
    const plantName = document.getElementById('plant-name').value;
    const collection = document.getElementById('collection-select').value; // Get the selected collection

    fetch(`http://localhost:3000/data/${collection}?commonName=${plantName}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const img = document.createElement('img');
                img.src = data[0].image; 
                img.alt = plantName;
                img.classList.add('grid-plant');

                // Find the first empty cell in the grid
                for (let i = 0; i < grid.length; i++) {
                    for (let j = 0; j < grid[i].length; j++) {
                        if (grid[i][j] === '') {
                            grid[i][j] = {
                                plantName: plantName,
                                imageUrl: data[0].image // Store the image URL in the grid
                            };
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

    console.log('Grid data:', grid); // Log the grid data

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
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
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

    fetch(`http://localhost:3000/user/${username}/layouts`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Read response as JSON
        })
        .then(data => {
            try {
                const savedLayoutsDiv = document.getElementById('saved-layouts');
                savedLayoutsDiv.innerHTML = ''; // Clear existing layouts

                data.forEach(layout => {
                    const layoutDiv = document.createElement('div');
                    layoutDiv.classList.add('saved-layout');
                    layoutDiv.textContent = layout.layoutName;
                    layoutDiv.addEventListener('click', () => {
                        console.log('Loading layout:', layout.layoutName, layout.grid); // Debugging log
                        loadLayout(layout.grid);
                    });
                    savedLayoutsDiv.appendChild(layoutDiv);
                });
            } catch (error) {
                console.error('Error processing layouts:', error);
            }
        })
        .catch(error => {
            console.error('Error fetching layouts:', error);
        });
}

function loadLayout(gridLayout) {
    // Clear the current grid
    grid.forEach(row => row.fill(''));
    document.querySelectorAll('.grid-item').forEach(item => item.innerHTML = '');

    console.log('Grid layout to load:', gridLayout); // Debugging log

    // Render the saved layout
    gridLayout.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell && cell.plantName && cell.imageUrl) {
                const img = document.createElement('img');
                img.src = cell.imageUrl;
                img.alt = cell.plantName;
                img.classList.add('grid-plant');

                const gridItem = document.querySelector(`.grid-item[data-row="${rowIndex}"][data-col="${colIndex}"]`);
                if (gridItem) {
                    console.log(`Appending image to row ${rowIndex}, col ${colIndex}:`, img); // Debugging log
                    gridItem.appendChild(img);
                } else {
                    console.error(`Grid cell not found for row ${rowIndex}, col ${colIndex}`);
                }
            }
        });
    });

    console.log('Layout loaded successfully');
}

function clearGrid() {
    // Clear the grid array
    grid.forEach(row => row.fill(''));

    // Clear the DOM elements
    document.querySelectorAll('.grid-item').forEach(item => item.innerHTML = '');

    console.log('Grid has been cleared'); // Debugging log
}