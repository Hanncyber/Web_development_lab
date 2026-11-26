const express = require("express");

const app = express();

app.use(express.json());

let posts = [];
let nextId = 1;


app.post("/posts", (req, res) => {
    const post = {
        id: nextId,
        content: req.body.content,
        comments: []
    };

    nextId++;

    posts.push(post);

    res.json(post);
});


app.get("/posts", (req, res) => {
    res.json(posts);
});


app.put("/posts/:id", (req, res) => {
    const post = posts.find(p => p.id === Number(req.params.id));

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    post.content = req.body.content;

    res.json(post);
});


app.delete("/posts/:id", (req, res) => {
    const postIndex = posts.findIndex(
        p => p.id === Number(req.params.id)
    );

    if (postIndex === -1) {
        return res.status(404).json({ message: "Post not found" });
    }

    posts.splice(postIndex, 1);

    res.json({ message: "Post deleted successfully" });
});


app.post("/posts/:id/comments", (req, res) => {
    const post = posts.find(p => p.id === Number(req.params.id));

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    const comment = {
        content: req.body.content
    };

    post.comments.push(comment);

    res.json(comment);
});


app.get("/posts/:id/comments", (req, res) => {
    const post = posts.find(p => p.id === Number(req.params.id));

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    res.json(post.comments);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
