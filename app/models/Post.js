const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            min: 3,
            max: 255,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            min: 3,
        },
        image: { type: String },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
        likes: [{ type: mongoose.Schema.Types.ObjectId }],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", postSchema);
