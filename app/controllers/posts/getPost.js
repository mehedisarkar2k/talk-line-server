// internal imports
const Post = require("../../models/Post");

module.exports = async (req, res, next) => {
    const { postId } = req.query;

    if (!postId) return next({ status: 404, message: "Invalid Post Id" });

    try {
        const post = await Post.findById(postId).populate(
            "author",
            "firstName lastName image"
        );
        // .populate("likes", "author image")
        // .populate("comments", "author image createdAt");

        if (!post) return next({ status: 404, message: "Invalid Post Id" });

        res.send({ error: false, post });
    } catch (error) {
        next(error);
    }
};
