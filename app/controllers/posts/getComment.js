const Comment = require("../../models/Comment");

module.exports = async (req, res, next) => {
    const { id } = req.query;

    try {
        const comment = await Comment.findById(id).populate(
            "author",
            "firstName lastName img"
        );

        if (!comment)
            return next({ status: 404, message: "Comment not found" });

        res.send({
            error: false,
            comment: comment,
        });
    } catch (error) {
        next(error);
    }
};
