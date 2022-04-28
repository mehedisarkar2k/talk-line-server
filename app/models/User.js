const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        image: {
            type: String,
        },
        // define user details object
        details: {
            type: mongoose.Schema.Types.Mixed,
        },
        friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

        // define the relationship between user and post
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    },
    {
        timestamps: true,
    }
);

userSchema.methods.generateToken = async function () {
    const token = await jwt.sign(
        {
            sub: this._id,
        },
        process.env.JWT_SECRET
    );

    return "Bearer " + token;
};

userSchema.methods.verifyToken = async function (token) {
    try {
        return await jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error(error);
    }
};

userSchema.methods.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
