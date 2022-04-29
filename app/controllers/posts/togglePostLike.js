const User = require("../../models/User");
const Post = require("../../models/Post");

module.exports = async (req, res, next) => {
    const user = req.user;

    const { postId } = req.body;
    if (!postId) return next({ status: 404, message: "No post id found" });

    try {
        const post = await Post.findById(postId);
        if (!post) return next({ status: 404, message: "No post found" });

        const likes = post.likes;
        const indexOfUser = likes.indexOf(user._id);

        let message;
        if (indexOfUser >= 0) {
            message = `${user.email} disliked`;
            likes.splice(indexOfUser, 1);
        } else {
            message = `${user.email} liked`;
            likes.push(user._id);
        }

        await post.save();

        res.status(200).send({ error: false, message: message });
    } catch (error) {
        next(error);
    }
};
