// external imports
const Joi = require("joi");

// external imports
const User = require("../../models/User");
const Post = require("../../models/Post");

module.exports = async (req, res, next) => {
    const postCreateSchema = new Joi.object({
        title: Joi.string().min(3).max(255),
        description: Joi.string().min(3).required(),
        image: Joi.string(),
    });

    try {
        const { error } = await postCreateSchema.validate(req.body);

        if (error)
            return next({ status: 422, message: error.details[0].message });

        const savePost = await new Post(req.body);

        const loggedInUser = await User.findById(req.user.id);
        loggedInUser.posts.push(savePost.id);
        savePost.author = loggedInUser.id;

        const post = await savePost.save();

        if (post) {
            await loggedInUser.save();

            res.status(201).send({
                error: false,
                message: "Post created successfully",
                author: loggedInUser.email,
            });
        } else {
            next({ status: 500, message: "Something went wrong, try again!" });
        }
    } catch (error) {
        next(error);
    }
};
