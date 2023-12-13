// post.js

// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", function () {
    // Retrieve postId from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("postId");

    // Check if postId is null before making the request
    if (postId !== null) {
        // Fetch post data by postId and display it
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

// Asynchronously fetch post data by postId
async function fetchPostDataById(postId) {
    // Construct the API URL for fetching post data
    const apiUrl = `https://blog-api-assignment.up.railway.app/posts/${postId}`;

    
    // Define an object named 'data' to store configuration options for a fetch request

const data = {
    // Specify the HTTP request method as 'GET' to retrieve data
    method: "GET",

    // Define headers to provide additional information about the request
    headers: {
        // Specify the content type of the request payload as JSON
        "Content-Type": "application/json"
    },
};

    try {
        // Make the fetch request to the API
        const response = await fetch(apiUrl, data);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response JSON and return the post data
        const postData = await response.json();
        return postData;
    } catch (error) {
        console.error("Error fetching post data:", error);
    }
}

// Display post data on the page
function displayPostData(postData) {
    // Check if postData is undefined or null
    if (!postData) {
        console.error("Post data is undefined or null.");
        return;
    }

    // Update document title and HTML elements with post data
    document.title = postData.title;
    document.getElementById("postTitle").innerText = postData.title;
    document.getElementById("postAuthor").innerText = "Author: " + postData.author;
    document.getElementById("postDate").innerText = "Date: " + formatDate(postData.date);
    document.getElementById("postContent").innerHTML = postData.content;
    document.getElementById("postTags").innerText = "Tags: " + postData.tags.join(", ");
}

// Format date string to a more readable format
function formatDate(dateString) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
