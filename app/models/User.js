const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 255,
        },
        lastName: {
            type: String,
            required: false,
            trim: true,
            min: 3,
            max: 255,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            min: 6,
            max: 255,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 1024,
        },
        // define user details object
        details: {
            type: Schema.Types.Mixed,
        },
        friends: [{ type: Schema.Types.ObjectId, ref: "User" }],

        // define the relationship between user and post
        posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
