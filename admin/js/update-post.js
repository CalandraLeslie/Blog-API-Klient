// This event listener ensures that the DOM content is fully loaded before executing the code inside it.
document.addEventListener("DOMContentLoaded", function () {
    // Fetch and display the post to be updated
    fetchPostData()
        .then((postData) => {
            // Check if postData is available
            if (postData) {
                // If available, populate the form with the retrieved data
                populateForm(postData);
            } else {
                // Log an error message if postData is null or undefined
                console.error("Error: Post data is null or undefined.");
            }
        })
        .catch((error) => {
            // Log an error message if there is an issue fetching post data
            console.error("Error fetching post data:", error);
        });

    // Add event listener for the update button
    const updateButton = document.getElementById("updateButton");
    if (updateButton) {
        // If the update button is found, add an event listener for click events
        updateButton.addEventListener("click", updatePost);
    } else {
        // Log an error message if the update button is not found
        console.error("Error: Update button not found.");
    }
});

// Asynchronous function to fetch post data based on the post ID from the URL
async function fetchPostData() {
    // Retrieve the post ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    // Check if the post ID is missing from the URL
    if (!postId) {
        // Log an error message and return null or handle the error accordingly
        console.error("Error: Post ID is missing from the URL.");
        return null;
    }

    // Construct the API URL for fetching a specific post
    const apiUrl = `https://blog-api-assignment.up.railway.app/posts/${postId}`;

    try {
        // Make a fetch request to the API
        const response = await fetch(apiUrl);

        // Check if the response is OK; otherwise, throw an error
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response as JSON and return the post data
        const postData = await response.json();
        return postData;
    } catch (error) {
        // Log an error message if there is an issue with the fetch operation and return null
        console.error("Error fetching post data:", error);
        return null;
    }
}

// Function to populate the form fields with the retrieved post data
function populateForm(postData) {
    // Get the update post form element by its ID
    const updatePostForm = document.getElementById("updatePostForm");

    // Check if the form element is found
    if (updatePostForm) {
        // Populate form fields with post data or empty strings if data is not available
        updatePostForm.elements["title"].value = postData.title || '';
        updatePostForm.elements["author"].value = postData.author || '';
        updatePostForm.elements["content"].value = postData.content || '';
        updatePostForm.elements["tags"].value = Array.isArray(postData.tags) ? postData.tags.join(", ") : '';
    } else {
        // Log an error message if the form element is not found
        console.error("Error: Update post form not found.");
    }
}

// Function to handle the update logic when the update button is clicked
function updatePost() {
    // Get the update post form element by its ID
    const updatePostForm = document.getElementById("updatePostForm");

    // Check if the form element is found
    if (!updatePostForm) {
        // Log an error message and return if the form element is not found
        console.error("Error: Update post form not found.");
        return;
    }

    // Extract values from the form fields
    const title = updatePostForm.elements["title"].value;
    const author = updatePostForm.elements["author"].value;
    const content = updatePostForm.elements["content"].value;
    const tags = updatePostForm.elements["tags"].value.split(",").map(tag => tag.trim());

    // Retrieve the post ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    // Check if the post ID is missing from the URL
    if (!postId) {
        // Log an error message and return if the post ID is missing
        console.error("Error: Post ID is missing from the URL.");
        return;
    }

    // Configure data for the PATCH request
    const data = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            author: author,
            content: content,
            tags: tags
        })
    };

    // Make a fetch request to update the post
    fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`, data)
        .then(response => {
            // Check if the response is OK; otherwise, throw an error
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parse the response as JSON and return it
            return response.json();
        })
        .then(updatedPostData => {
            // Handle successful update
            console.log("Post updated successfully:", updatedPostData);
            // Redirect back to the admin dashboard after a successful update
            window.location.href = 'index.html';
        })
        .catch(error => {
            // Log an error message if there
