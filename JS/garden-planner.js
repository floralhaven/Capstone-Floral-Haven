let grid = Array(3).fill().map(() => Array(3).fill(''));
let userId = sessionStorage.getItem('loggedInUserId'); // Store userId

// Call this function to set userId after successful login
function setUserId(id) {
    userId = id;
    sessionStorage.setItem('loggedInUserId', id);
}

document.addEventListener('DOMContentLoaded', () => {
    userId = sessionStorage.getItem('loggedInUserId'); // Retrieve userId
    fetchLayouts(); // Fetch existing layouts on page load

    document.getElementById('addPlantButton').addEventListener('click', addPlant);
    document.getElementById('saveLayoutButton').addEventListener('click', saveLayout);
});

function addPlant() {
    const collection = document.getElementById('collection-select').value;
    const plantName = document.getElementById('plant-name').value;
    fetch(`http://localhost:3000/data/${collection}?name=${plantName}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const img = document.createElement('img');
                img.src = data[0].image;
                img.alt = plantName;
                img.classList.add('grid-item');
                // Find the first empty cell in the grid
                for (let i = 0; i < grid.length; i++) {
                    for (let j = 0; j < grid[i].length; j++) {
                        if (grid[i][j] === '') {
                            grid[i][j] = data[0].image;
                            const cell = document.querySelector(`.grid-item[data-row="${i}"][data-col="${j}"]`);
                            cell.appendChild(img);
                            return;
                        }
                    }
                }
            } else {
                alert('Plant not found');
            }
        });
}

function saveLayout() {
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
            fetchLayouts(); // Refresh layouts after saving
        });
}

function fetchLayouts() {
    if (!userId) {
        alert('User not logged in');
        return;
    }

    fetch(`/user/${userId}/layouts`)
        .then(response => response.json())
        .then(layouts => {
            console.log('User layouts:', layouts);
            const layoutsDiv = document.getElementById('layouts');
            layoutsDiv.innerHTML = ''; // Clear existing layouts
            // Render layouts on the page
            layouts.forEach(layout => {
                const layoutDiv = document.createElement('div');
                layoutDiv.innerHTML = `<h3>${layout.name}</h3>`;
                layoutDiv.classList.add('layout');
                layout.grid.forEach((row, rowIndex) => {
                    row.forEach((cell, colIndex) => {
                        const cellDiv = document.createElement('div');
                        cellDiv.classList.add('grid-item');
                        if (cell) {
                            const img = document.createElement('img');
                            img.src = cell;
                            img.classList.add('grid-item');
                            cellDiv.appendChild(img);
                        }
                        layoutDiv.appendChild(cellDiv);
                    });
                });
                layoutsDiv.appendChild(layoutDiv);
            });
        });
}