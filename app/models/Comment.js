const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true,
            min: 1,
        },
        image: { type: String },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        likes: [{ type: mongoose.Schema.Types.ObjectId }],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Comment", commentSchema);
