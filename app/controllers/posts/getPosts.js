const Post = require("../../models/Post");

module.exports = async (req, res, next) => {
    const { perPage = 1, page = 1 } = req.query;

    const skipping = +perPage * (+page - 1),
        totalShow = +perPage + skipping;

    try {
        const totalPost = await Post.find().count();

        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .skip(skipping)
            .limit(+perPage)
            .populate("author", "firstName lastName image");

        // calculating remaining post
        let remainPost = totalPost - totalShow;
        remainPost = remainPost < 0 ? 0 : remainPost;

        res.send({ success: true, posts, remainPost });
    } catch (error) {
        next(error);
    }
};
