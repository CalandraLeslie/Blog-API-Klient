// post.js
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("postId");

    // Check if postId is null before making the request
    if (postId !== null) {
        fetchPostDataById(postId)
            .then((postData) => {
                displayPostData(postData);
            })
            .catch((error) => {
                console.error("Error fetching post data:", error);
            });
    } else {
        console.error("Post ID is null. Unable to fetch post data.");
    }
});

async function fetchPostDataById(postId) {
    const apiUrl = `https://blog-api-assignment.up.railway.app/posts/${postId}`;

    // Modify this section to fit your data structure
    const data = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        // Add any additional headers or parameters needed
    };

    try {
        const response = await fetch(apiUrl, data);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const postData = await response.json();
        return postData;
    } catch (error) {
        console.error("Error fetching post data:", error);
    }
}

function displayPostData(postData) {
    if (!postData) {
        console.error("Post data is undefined or null.");
        return;
    }

    document.title = postData.title;
    document.getElementById("postTitle").innerText = postData.title;
    document.getElementById("postAuthor").innerText = "Author: " + postData.author;
    document.getElementById("postDate").innerText = "Date: " + formatDate(postData.date);
    document.getElementById("postContent").innerHTML = postData.content;
    document.getElementById("postTags").innerText = "Tags: " + postData.tags.join(", ");
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
