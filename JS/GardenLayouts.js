// const baseUrl = "https://chelseabui11.github.io/Capstone-Floral-Haven-API/";
const baseUrl = "http://localhost:3000/";

document.addEventListener('DOMContentLoaded', loadAllLayouts);
document.getElementById('search-button').addEventListener('click', searchLayouts);

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

async function fetchAllLayouts() {
    const response = await fetch(`${baseUrl}layouts`);
    const layouts = await response.json();
    return layouts;
}

async function fetchLayoutsByUsername(username) {
    const response = await fetch(`${baseUrl}layouts?username=${username}`);
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
        title.textContent = layout.name;

        const user = document.createElement('h4');
        user.textContent = `By: ${layout.username}`;

        const grid = document.createElement('div');
        grid.className = 'grid';

        layout.plants.forEach(plant => {
            const cell = document.createElement('div');
            const img = document.createElement('img');
            img.src = plant.imgUrl;
            img.alt = plant.commonName;

            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = `${plant.commonName} (${plant.collection})`;

            cell.appendChild(img);
            cell.appendChild(tooltip);
            grid.appendChild(cell);
        });

        const commentButton = document.createElement('button');
        commentButton.className = 'comment-button';
        commentButton.textContent = 'Comment';
        commentButton.addEventListener('click', () => {
            addComment(layout.username, layout.name);
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

// Mock data and functions for testing
async function fetchAllLayouts() {
    // Mock data
    const mockData = [
        {
            username: 'john_doe',
            name: 'Spring Garden',
            plants: [
                { commonName: 'Rose', collection: 'flowers', imgUrl: 'https://helloartsy.com/wp-content/uploads/kids/flowers/how_to_draw_a_rose_for_beginners/how-to-draw-a-rose-for-beginners_step-6.jpg' },
                { commonName: 'Tulip', collection: 'flowers', imgUrl: 'https://images.pexels.com/photos/36729/tulip-flower-bloom-pink.jpg?cs=srgb&dl=pexels-pixabay-36729.jpg&fm=jpg' },
                { commonName: 'Rose', collection: 'flowers', imgUrl: 'https://helloartsy.com/wp-content/uploads/kids/flowers/how_to_draw_a_rose_for_beginners/how-to-draw-a-rose-for-beginners_step-6.jpg' },
                { commonName: 'Tulip', collection: 'flowers', imgUrl: 'https://images.pexels.com/photos/36729/tulip-flower-bloom-pink.jpg?cs=srgb&dl=pexels-pixabay-36729.jpg&fm=jpg' },
                { commonName: 'Rose', collection: 'flowers', imgUrl: 'https://helloartsy.com/wp-content/uploads/kids/flowers/how_to_draw_a_rose_for_beginners/how-to-draw-a-rose-for-beginners_step-6.jpg' },
                { commonName: 'Tulip', collection: 'flowers', imgUrl: 'https://images.pexels.com/photos/36729/tulip-flower-bloom-pink.jpg?cs=srgb&dl=pexels-pixabay-36729.jpg&fm=jpg' },
                { commonName: 'Rose', collection: 'flowers', imgUrl: 'https://helloartsy.com/wp-content/uploads/kids/flowers/how_to_draw_a_rose_for_beginners/how-to-draw-a-rose-for-beginners_step-6.jpg' },
                { commonName: 'Tulip', collection: 'flowers', imgUrl: 'https://images.pexels.com/photos/36729/tulip-flower-bloom-pink.jpg?cs=srgb&dl=pexels-pixabay-36729.jpg&fm=jpg' },
                { commonName: 'Rose', collection: 'flowers', imgUrl: 'https://helloartsy.com/wp-content/uploads/kids/flowers/how_to_draw_a_rose_for_beginners/how-to-draw-a-rose-for-beginners_step-6.jpg' },
            ]
        },
        {
            username: 'Barbie',
            name: 'Spring Garden',
            plants: [
                { commonName: 'Rose', collection: 'flowers', imgUrl: 'https://helloartsy.com/wp-content/uploads/kids/flowers/how_to_draw_a_rose_for_beginners/how-to-draw-a-rose-for-beginners_step-6.jpg' },
                { commonName: 'Tulip', collection: 'flowers', imgUrl: 'https://images.pexels.com/photos/36729/tulip-flower-bloom-pink.jpg?cs=srgb&dl=pexels-pixabay-36729.jpg&fm=jpg' },
                { commonName: 'Rose', collection: 'flowers', imgUrl: 'https://helloartsy.com/wp-content/uploads/kids/flowers/how_to_draw_a_rose_for_beginners/how-to-draw-a-rose-for-beginners_step-6.jpg' },
                { commonName: 'Tulip', collection: 'flowers', imgUrl: 'https://images.pexels.com/photos/36729/tulip-flower-bloom-pink.jpg?cs=srgb&dl=pexels-pixabay-36729.jpg&fm=jpg' },
                { commonName: 'Rose', collection: 'flowers', imgUrl: 'https://helloartsy.com/wp-content/uploads/kids/flowers/how_to_draw_a_rose_for_beginners/how-to-draw-a-rose-for-beginners_step-6.jpg' },
                { commonName: 'Tulip', collection: 'flowers', imgUrl: 'https://images.pexels.com/photos/36729/tulip-flower-bloom-pink.jpg?cs=srgb&dl=pexels-pixabay-36729.jpg&fm=jpg' },
                { commonName: 'Rose', collection: 'flowers', imgUrl: 'https://helloartsy.com/wp-content/uploads/kids/flowers/how_to_draw_a_rose_for_beginners/how-to-draw-a-rose-for-beginners_step-6.jpg' },
                { commonName: 'Tulip', collection: 'flowers', imgUrl: 'https://images.pexels.com/photos/36729/tulip-flower-bloom-pink.jpg?cs=srgb&dl=pexels-pixabay-36729.jpg&fm=jpg' },
                { commonName: 'Rose', collection: 'flowers', imgUrl: 'https://helloartsy.com/wp-content/uploads/kids/flowers/how_to_draw_a_rose_for_beginners/how-to-draw-a-rose-for-beginners_step-6.jpg' },
            ]
        },
        {
            username: 'john_doe',
            name: 'Spring Garden',
            plants: [
                { commonName: 'Rose', collection: 'flowers', imgUrl: 'https://helloartsy.com/wp-content/uploads/kids/flowers/how_to_draw_a_rose_for_beginners/how-to-draw-a-rose-for-beginners_step-6.jpg' },
                { commonName: 'Tulip', collection: 'flowers', imgUrl: 'https://images.pexels.com/photos/36729/tulip-flower-bloom-pink.jpg?cs=srgb&dl=pexels-pixabay-36729.jpg&fm=jpg' },
                { commonName: 'Rose', collection: 'flowers', imgUrl: 'https://helloartsy.com/wp-content/uploads/kids/flowers/how_to_draw_a_rose_for_beginners/how-to-draw-a-rose-for-beginners_step-6.jpg' },
                { commonName: 'Tulip', collection: 'flowers', imgUrl: 'https://images.pexels.com/photos/36729/tulip-flower-bloom-pink.jpg?cs=srgb&dl=pexels-pixabay-36729.jpg&fm=jpg' },
                { commonName: 'Rose', collection: 'flowers', imgUrl: 'https://helloartsy.com/wp-content/uploads/kids/flowers/how_to_draw_a_rose_for_beginners/how-to-draw-a-rose-for-beginners_step-6.jpg' },
                { commonName: 'Tulip', collection: 'flowers', imgUrl: 'https://images.pexels.com/photos/36729/tulip-flower-bloom-pink.jpg?cs=srgb&dl=pexels-pixabay-36729.jpg&fm=jpg' },
                { commonName: 'Rose', collection: 'flowers', imgUrl: 'https://helloartsy.com/wp-content/uploads/kids/flowers/how_to_draw_a_rose_for_beginners/how-to-draw-a-rose-for-beginners_step-6.jpg' },
                { commonName: 'Tulip', collection: 'flowers', imgUrl: 'https://images.pexels.com/photos/36729/tulip-flower-bloom-pink.jpg?cs=srgb&dl=pexels-pixabay-36729.jpg&fm=jpg' },
                { commonName: 'Rose', collection: 'flowers', imgUrl: 'https://helloartsy.com/wp-content/uploads/kids/flowers/how_to_draw_a_rose_for_beginners/how-to-draw-a-rose-for-beginners_step-6.jpg' },
            ]
        },
    ];

    return mockData;
}

async function fetchLayoutsByUsername(username) {
    const layouts = await fetchAllLayouts();
    return layouts.filter(layout => layout.username === username);
}