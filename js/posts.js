// index.js
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

async function fetchBlogPosts() {
    const apiUrl = "https://blog-api-assignment.up.railway.app/posts";

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

        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        throw error; // Rethrow the error to propagate it
    }
}

function displayBlogPosts(posts) {
    const blogList = document.getElementById("blogList");

    posts.forEach((post) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>${post.title}</strong><br>
            Author: ${post.author || 'Unknown'}<br>
            Date: ${formatDate(post.date) || 'Unknown'}<br>
            Content: ${truncateContent(post.content) || 'No content'}<br>
            Tags: ${Array.isArray(post.tags) ? post.tags.join(", ") : 'No tags'}<br>
            <a href="post.html?postId=${post._id}">Read more..</a>
            <hr>
        `;
        blogList.appendChild(listItem);
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

function truncateContent(content) {
    // Show only the first 100 characters
    return content ? content.slice(0, 100) : '';
}