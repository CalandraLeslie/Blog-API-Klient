

// Wait for the DOM content to be fully loaded before executing the main logic
document.addEventListener("DOMContentLoaded", function () {
    // Fetch and display blog posts
    fetchBlogPosts()
        .then((posts) => {
            displayBlogPosts(posts);
        })
        .catch((error) => {
            console.error("Error fetching blog posts:", error);
        });
});

// Asynchronously fetches blog posts from a specified API endpoint
async function fetchBlogPosts() {
    const apiUrl = "https://blog-api-assignment.up.railway.app/posts";

    // Define the configuration for the HTTP request

// Create an object named 'data' to store options for a fetch request
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
        // Send the HTTP request and await the response
        const response = await fetch(apiUrl, data);

        // Check if the response indicates success; otherwise, throw an error
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response as JSON and return the resulting blog posts
        const posts = await response.json();
        return posts;
    } catch (error) {
        // Log and rethrow the error to propagate it
        console.error("Error fetching blog posts:", error);
        throw error;
    }
}

// Displays the fetched blog posts on the webpage
function displayBlogPosts(posts) {
    // Get the HTML element where the blog posts will be displayed
    const blogList = document.getElementById("blogList");

    // Iterate through each blog post and create a list item for display
    posts.forEach((post) => {
        const listItem = document.createElement("li");

        // Populate the list item with information from the blog post
        listItem.innerHTML = `
            <strong>${post.title}</strong><br>
            Author: ${post.author || 'Unknown'}<br>
            Date: ${formatDate(post.date) || 'Unknown'}<br>
            Content: ${truncateContent(post.content) || 'No content'}<br>
            Tags: ${Array.isArray(post.tags) ? post.tags.join(", ") : 'No tags'}<br>
            <a href="post.html?postId=${post._id}">Read more..</a>
            <hr>
        `;

        // Append the list item to the blog list
        blogList.appendChild(listItem);
    });
}

// Formats a date string into a human-readable format
function formatDate(dateString) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Truncates the content to show only the first 100 characters
function truncateContent(content) {
    return content ? content.slice(0, 100) : '';
}
