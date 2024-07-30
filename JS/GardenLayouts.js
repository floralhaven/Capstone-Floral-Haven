document.addEventListener('DOMContentLoaded', loadAllLayouts);
document.getElementById('search-button').addEventListener('click', searchLayouts);
document.getElementById('clear-button').addEventListener('click', clearSearch);

// const baseUrl = "https://chelseabui11.github.io/Capstone-Floral-Haven-API/";
const baseUrl = 'http://localhost:3000/';
const currentUser = { username: 'currentUsernameHere' };

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

        // Comment Section
        const commentSection = document.createElement('div');
        commentSection.className = 'comment-section';

        const commentInput = document.createElement('textarea');
        commentInput.className = 'comment-input';
        commentInput.placeholder = 'Write your comment...';

        const postCommentButton = document.createElement('button');
        postCommentButton.className = 'post-comment-button';
        postCommentButton.textContent = 'Post Comment';
        postCommentButton.addEventListener('click', () => {
            const comment = commentInput.value.trim();
            if (comment) {
                saveComment(layout.username, layout.layoutName, currentUser.username, comment);
                commentInput.value = ''; // Clear the input after saving the comment
            } else {
                alert('Please enter a comment.');
            }
        });

        const commentList = document.createElement('div');
        commentList.className = 'comment-list';

        // Load and display existing comments for the layout
        loadComments(layout.username, layout.layoutName, commentList);

        commentSection.appendChild(commentInput);
        commentSection.appendChild(postCommentButton);
        commentSection.appendChild(commentList);

        card.appendChild(title);
        card.appendChild(user);
        card.appendChild(grid);
        card.appendChild(commentSection);

        container.appendChild(card);
    });
}

async function saveComment(layoutOwner, layoutName, username, comment) {
    console.log("Layout Owner:", layoutOwner);
    console.log("Layout Name:", layoutName);
    console.log("Username:", username);
    console.log("Comment:", comment);

    try {
        const response = await fetch(`${baseUrl}comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                layoutOwner,
                layoutName,
                username,
                commentText: comment
            })
        });

        if (response.ok) {
            console.log('Comment added successfully!');
        } else {
            console.log('Failed to add comment. Please try again.');
        }
    } catch (error) {
        console.error('Error posting comment:', error);
    }
}

async function loadComments(layoutOwner, layoutName, commentList) {
    const response = await fetch(`${baseUrl}comments?layoutOwner=${layoutOwner}&layoutName=${layoutName}`);
    if (response.ok) {
        const comments = await response.json();
        comments.forEach(comment => {
            const commentItem = document.createElement('div');
            commentItem.className = 'comment-item';
            commentItem.textContent = comment.commentText; // assuming comment object has a 'commentText' property
            commentList.appendChild(commentItem);
        });
    } else {
        console.error('Failed to load comments');
    }
}