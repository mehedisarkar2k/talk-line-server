const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const Joi = require("joi");

module.exports = async (req, res, next) => {
    const { postId, description, image } = req.body;

    const commentCreatSchema = new Joi.object({
        description: Joi.string().trim().min(1).required(),
        postId: Joi.string().required(),
        image: Joi.string(),
    });

    try {
        const { error } = await commentCreatSchema.validate(req.body);
        if (error)
            return next({ status: 422, message: error.details[0].message });

        const post = await Post.findById(postId);
        if (!post) return next({ status: 404, message: "Post not found" });

        const data = {
            description,
            author: req.user.id,
            post: postId,
        };

        if (image) {
            data.image = image;
        }

        const comment = await new Comment(data);

        if (comment) {
            post.comments.push(comment.id);
            await post.save();
            await comment.save();

            res.status(201).send({
                error: false,
                message: "New comment added",
            });
        } else {
            next("Something went wrong");
        }
    } catch (error) {
        next(error);
    }
};
