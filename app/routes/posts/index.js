const { createPost } = require("../../controllers/posts");
const { verifyUser } = require("../../middlewares/auth");
const Post = require("../../models/Post");

const router = require("express").Router();

router.get("/", async (req, res) => {
    const posts = await Post.find().populate("author", "firstName lastName");

    res.send(posts);
});

router.post("/", verifyUser, createPost);

module.exports = router;
