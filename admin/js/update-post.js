document.addEventListener("DOMContentLoaded", function () {
    // Fetch and display the post to be updated
    fetchPostData()
        .then((postData) => {
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

async function fetchPostData() {
    // Retrieve the post ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    if (!postId) {
        console.error("Error: Post ID is missing from the URL.");
        // You can return a default value or handle the error accordingly
        return null;
    }

    const apiUrl = `https://blog-api-assignment.up.railway.app/posts/${postId}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const postData = await response.json();
        return postData;
    } catch (error) {
        console.error("Error fetching post data:", error);
        return null;
    }
}

function populateForm(postData) {
    // Populate the form fields with the retrieved post data
    const updatePostForm = document.getElementById("updatePostForm");

    if (updatePostForm) {
        updatePostForm.elements["title"].value = postData.title || '';
        updatePostForm.elements["author"].value = postData.author || '';
        updatePostForm.elements["content"].value = postData.content || '';
        updatePostForm.elements["tags"].value = Array.isArray(postData.tags) ? postData.tags.join(", ") : '';
    } else {
        console.error("Error: Update post form not found.");
    }
}

function updatePost() {
    // Implement the update logic here
    const updatePostForm = document.getElementById("updatePostForm");

    if (!updatePostForm) {
        console.error("Error: Update post form not found.");
        return;
    }

    const title = updatePostForm.elements["title"].value;
    const author = updatePostForm.elements["author"].value;
    const content = updatePostForm.elements["content"].value;
    const tags = updatePostForm.elements["tags"].value.split(",").map(tag => tag.trim());

    // Retrieve the post ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    if (!postId) {
        console.error("Error: Post ID is missing from the URL.");
        return;
    }

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

    fetch(`https://blog-api-assignment.up.railway.app/posts/${postId}`, data)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(updatedPostData => {
            // Handle successful update
            console.log("Post updated successfully:", updatedPostData);
            // Redirect back to the admin dashboard after a successful update
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.error("Error updating post:", error);
        });
}
