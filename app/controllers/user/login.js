// external imports
const Joi = require("joi");

// internal imports
const User = require("../../models/User");
const { isValidPassword } = require("../../utils/bcrypt");
const { generateToken } = require("../../utils/jwt");

module.exports = async (req, res, next) => {
    const loginSchema = new Joi.object({
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(3).max(255).required(),
    });

    try {
        const { error } = await loginSchema.validate(req.body);
        if (error)
            return next({ status: 422, message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return next({ status: 400, message: "Invalid credentials!" });

        const isValid = await isValidPassword(req.body.password, user.password);

        if (!isValid)
            return next({ status: 400, message: "Invalid credentials!" });

        const token = generateToken({
            _id: user._id,
            email: user.email,
            name: `${user.firstName} ${user?.lastName || ""}`.trim(),
        });

        res.status(200).json({ success: true, token });
    } catch (error) {
        next(error);
    }
};
