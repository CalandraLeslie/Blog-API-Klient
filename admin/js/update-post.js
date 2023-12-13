// Execute the following code when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Fetch and display the post to be updated
    fetchPostData()
        .then((postData) => {
            // If post data is available, populate the form
            if (postData) {
                populateForm(postData);
            } else {
                console.error("Error: Post data is null or undefined.");
            }
        })
        .catch((error) => {
            console.error("Error fetching post data:", error);
        });

    // Add event listener for the update button
    const updateButton = document.getElementById("updateButton");
    if (updateButton) {
        updateButton.addEventListener("click", updatePost);
    } else {
        console.error("Error: Update button not found.");
    }
});

// Asynchronous function to fetch post data based on the post ID from the URL
async function fetchPostData() {
    // Retrieve the post ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    // If the post ID is missing, log an error and return null
    if (!postId) {
        console.error("Error: Post ID is missing from the URL.");
        // You can return a default value or handle the error accordingly
        return null;
    }

    // Construct the API URL for fetching post data
    const apiUrl = `https://blog-api-assignment.up.railway.app/posts/${postId}`;

    try {
        // Fetch data from the API endpoint
        const response = await fetch(apiUrl);

        // If the HTTP response is not OK, throw an error
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response as JSON and return the post data
        const postData = await response.json();
        return postData;
    } catch (error) {
        // Log an error if there's an issue fetching post data
        console.error("Error fetching post data:", error);
        return null;
    }
}

// Function to populate the form fields with the retrieved post data
function populateForm(postData) {
    // Get the form element by its ID
    const updatePostForm = document.getElementById("updatePostForm");

    // If the form is found, populate its elements with post data
    if (updatePostForm) {
        updatePostForm.elements["title"].value = postData.title || '';
        updatePostForm.elements["author"].value = postData.author || '';
        updatePostForm.elements["content"].value = postData.content || '';

        // Clear existing selections in the tags select element
        const tagsSelect = updatePostForm.elements["tags"];
        Array.from(tagsSelect.options).forEach(option => {
            option.selected = false;
        });

        // Select options based on the tags from the post data
        Array.from(tagsSelect.options).forEach(option => {
            if (postData.tags && postData.tags.includes(option.value)) {
                option.selected = true;
            }
        });
    } else {
        console.error("Error: Update post form not found.");
    }
}

// Function to handle the update of a post
function updatePost() {
    // Get the form element by its ID
    const updatePostForm = document.getElementById("updatePostForm");

    // If the form is not found, log an error and return
    if (!updatePostForm) {
        console.error("Error: Update post form not found.");
        return;
    }

    // Extract values from form fields
    const title = updatePostForm.elements["title"].value;
    const author = updatePostForm.elements["author"].value;
    const content = updatePostForm.elements["content"].value;
    
    // Extract selected tags from the tags select element
    const selectedTags = Array.from(updatePostForm.elements["tags"].selectedOptions).map(option => option.value);

    // Retrieve the post ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    // If the post ID is missing, log an error and return
    if (!postId) {
        console.error("Error: Post ID is missing from the URL.");
        return;
    }

    // Prepare data for the PATCH request to update the post
    const data = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            author: author,
            content: content,
            tags: selectedTags
        })
    };

    // Make a fetch request to update the post
    fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`, data)
        .then(response => {
            // If the HTTP response is not OK, throw an error
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
            // Handle any errors that occurred during the fetch operation
            console.error("Error updating post:", error);
        });
}
