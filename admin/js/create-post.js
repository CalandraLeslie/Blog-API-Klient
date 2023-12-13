// create-post.js

// Function to handle the creation of a new post
function createPost() {
    // Retrieve the HTML form element by its ID
    const createPostForm = document.getElementById("createPostForm");

    // Extract values from the form elements (title, author, content, and tags)
    const title = createPostForm.elements["title"].value;
    const author = createPostForm.elements["author"].value;
    const content = createPostForm.elements["content"].value;

    // Extract tags from the tags input and trim whitespace
    const selectedTags = createPostForm.elements["tags"].selectedOptions;
    const tags = Array.from(selectedTags).map(tagOption => tagOption.value);

    // Prepare data for the POST request to create the new post
    const data = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // Convert form data to JSON format
        body: JSON.stringify({
            title: title,
            author: author,
            content: content,
            tags: tags
        })
    };

    // Step 1: Create the post by making a fetch request to the server API
    fetch("https://blog-api-assignment.up.railway.app/posts", data)
        .then(response => {
            // Check if the response status is OK
            if (!response.ok) {
                // If not OK, throw an error with status and statusText
                throw new Error(`Error creating post: ${response.status} ${response.statusText}`);
            }
            // If OK, parse the response as JSON and return it
            return response.json();
        })
        .then(postData => {
            // Step 2: Handle successful creation
            console.log("Post created successfully:", postData);

            // Redirect back to index.html and pass the new post ID as a query parameter
            window.location.href = `index.html?newPostId=${postData.id}`;
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch operation
            console.error(error.message);
        });
}
