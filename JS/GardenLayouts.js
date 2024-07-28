// scripts.js

document.addEventListener('DOMContentLoaded', loadAllLayouts);
document.getElementById('search-button').addEventListener('click', searchLayouts);
document.getElementById('clear-button').addEventListener('click', clearSearch);

const baseUrl = 'http://localhost:3000/'; // Ensure this points to your backend server

async function loadAllLayouts() {
    const layouts = await fetchAllLayouts();
    displayLayouts(layouts);
}

async function searchLayouts() {
    const username = document.getElementById('search-bar').value;
    if (username.trim() === '') {
        alert('Please enter a username.');
        return;
    }

    const layouts = await fetchLayoutsByUsername(username);
    displayLayouts(layouts, username);
}

function clearSearch() {
    document.getElementById('search-bar').value = '';
    loadAllLayouts();
}

async function fetchAllLayouts() {
    const response = await fetch(`${baseUrl}layouts`);
    const layouts = await response.json();
    return layouts;
}

async function fetchLayoutsByUsername(username) {
    const response = await fetch(`${baseUrl}user/${username}/layouts`);
    const layouts = await response.json();
    return layouts;
}

function displayLayouts(layouts, username = '') {
    const container = document.getElementById('layouts-container');
    container.innerHTML = '';

    if (layouts.length === 0) {
        container.innerHTML = `<p>${username ? `No layouts found for user: ${username}` : 'No layouts found.'}</p>`;
        return;
    }

    layouts.forEach(layout => {
        const card = document.createElement('div');
        card.className = 'layout-card';

        const title = document.createElement('h3');
        title.textContent = layout.layoutName;

        const user = document.createElement('h4');
        user.textContent = `By: ${layout.username}`;

        const grid = document.createElement('div');
        grid.className = 'Garden-container';

        layout.grid.forEach(row => {
            row.forEach(plant => {
                const cell = document.createElement('div');
                cell.className = 'Garden-item';

                const img = document.createElement('img');
                img.src = plant.imageUrl;
                img.alt = plant.plantName;

                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = plant.plantName;

                cell.appendChild(img);
                cell.appendChild(tooltip);
                grid.appendChild(cell);
            });
        });

        const commentButton = document.createElement('button');
        commentButton.className = 'comment-button';
        commentButton.textContent = 'Comment';
        commentButton.addEventListener('click', () => {
            addComment(layout.username, layout.layoutName);
        });

        card.appendChild(title);
        card.appendChild(user);
        card.appendChild(grid);
        card.appendChild(commentButton);

        container.appendChild(card);
    });
}

function addComment(layoutOwner, layoutName) {
    const comment = prompt(`Enter your comment for ${layoutOwner}'s layout "${layoutName}":`);
    if (comment) {
        saveComment(layoutOwner, layoutName, comment);
    }
}

async function saveComment(layoutOwner, layoutName, comment) {
    const response = await fetch(`${baseUrl}comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            layoutOwner,
            layoutName,
            comment
        })
    });

    if (response.ok) {
        alert('Comment added successfully!');
    } else {
        alert('Failed to add comment. Please try again.');
    }
}
