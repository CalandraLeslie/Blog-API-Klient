// create-post.js
function createPost() {
    const createPostForm = document.getElementById("createPostForm");
    const title = createPostForm.elements["title"].value;
    const author = createPostForm.elements["author"].value;
    const content = createPostForm.elements["content"].value;
    const tags = createPostForm.elements["tags"].value.split(",").map(tag => tag.trim());

    const data = {
        method: "POST",
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

    // Step 1: Create the post
    fetch("https://blog-api-assignment.up.railway.app/posts", data)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error creating post: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(postData => {
            // Handle successful creation
            console.log("Post created successfully:", postData);

            // Step 2: Redirect back to index.html and pass the new post ID as a query parameter
            window.location.href = `index.html?newPostId=${postData.id}`;
        })
        .catch(error => {
            console.error(error.message);
        });
}