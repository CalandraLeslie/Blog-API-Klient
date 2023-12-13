document.addEventListener("DOMContentLoaded", function () {
    // Fetch and display posts
    fetchPosts()
        .then((posts) => {
            displayPosts(posts);
        })
        .catch((error) => {
            console.error("Error fetching posts:", error);
        });
});

async function fetchPosts() {
    const apiUrl = "https://blog-api-assignment.up.railway.app/posts";

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

function displayPosts(posts) {
    const postTableBody = document.getElementById("postTableBody");

    posts.forEach((post) => {
        const row = document.createElement("tr");
        row.dataset.postId = post._id; // Add data attribute for easier identification
        row.innerHTML = `
            <td>${post.title}</td>
            <td>${post.author}</td>
            <td>${post.tags ? post.tags.join(", ") : 'No tags'}</td> <!-- Check if tags is defined -->
            <td>${formatDate(post.date)}</td>
            <td>
                <button onclick="openUpdatePost('${post._id}')">Update</button>
                <button onclick="confirmDelete('${post._id}', '${post.title}')">Delete</button>
            </td>
        `;
        postTableBody.appendChild(row);
    });
}

function formatDate(dateString) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function openUpdatePost(postId) {
    // Redirect to the update-post.html page with the post ID in the query parameter
    window.location.href = `update-post.html?postId=${postId}`;
}

function confirmDelete(postId, postTitle) {
    const isConfirmed = confirm(`Are you sure you want to delete the post "${postTitle}"?`);

    if (isConfirmed) {
        deletePost(postId);
    }
}

async function deletePost(postId) {
    const apiUrl = `https://blog-api-assignment.up.railway.app/posts/${postId}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Remove the deleted post from the table
        const row = document.querySelector(`[data-post-id="${postId}"]`);
        if (row) {
            row.remove();
        }

        // Redirect to index.html after successful deletion
        window.location.href = 'index.html';
    } catch (error) {
        console.error(`Error deleting post with ID ${postId}:`, error);
    }
}