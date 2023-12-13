// This event listener ensures that the DOM content is fully loaded before executing the code inside it.
document.addEventListener("DOMContentLoaded", function () {
    // Fetch and display posts when the DOM is ready
    fetchPosts()
        .then((posts) => {
            // Once posts are fetched, display them on the page
            displayPosts(posts);
        })
        .catch((error) => {
            // Log an error message if there is an issue fetching posts
            console.error("Error fetching posts:", error);
        });
});

// Asynchronous function to fetch posts from the API
async function fetchPosts() {
    // Define the API URL for fetching posts
    const apiUrl = "https://blog-api-assignment.up.railway.app/posts";

    try {
        // Make a fetch request to the API
        const response = await fetch(apiUrl);

        // Check if the response is OK; otherwise, throw an error
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response as JSON and return the posts
        const posts = await response.json();
        return posts;
    } catch (error) {
        // Log an error message if there is an issue with the fetch operation
        console.error("Error fetching posts:", error);
    }
}

// Function to display posts on the page
function displayPosts(posts) {
    // Get the table body element by its ID
    const postTableBody = document.getElementById("postTableBody");

    // Iterate through each post and create a table row for each
    posts.forEach((post) => {
        const row = document.createElement("tr");
        // Add a data attribute to the row for easier identification
        row.dataset.postId = post._id;
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
        // Append the row to the table body
        postTableBody.appendChild(row);
    });
}

// Function to format a date string using the specified options
function formatDate(dateString) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Function to open the update-post.html page with the post ID in the query parameter
function openUpdatePost(postId) {
    window.location.href = `update-post.html?postId=${postId}`;
}

// Function to confirm post deletion and call deletePost if confirmed
function confirmDelete(postId, postTitle) {
    const isConfirmed = confirm(`Are you sure you want to delete the post "${postTitle}"?`);

    if (isConfirmed) {
        // Call the deletePost function if the deletion is confirmed
        deletePost(postId);
    }
}

// Asynchronous function to delete a post by making a DELETE request to the API
async function deletePost(postId) {
    // Define the API URL for deleting a specific post
    const apiUrl = `https://blog-api-assignment.up.railway.app/posts/${postId}`;

    try {
        // Make a fetch request with the DELETE method to delete the post
        const response = await fetch(apiUrl, {
            method: 'DELETE',
        });

        // Check if the deletion was successful; otherwise, throw an error
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Remove the deleted post from the table by selecting its row using the data attribute
        const row = document.querySelector(`[data-post-id="${postId}"]`);
        if (row) {
            row.remove();
        }

        // Redirect to index.html after successful deletion
        window.location.href = 'index.html';
    } catch (error) {
        // Log an error message if there is an issue with the delete operation
        console.error(`Error deleting post with ID ${postId}:`, error);
    }
}
