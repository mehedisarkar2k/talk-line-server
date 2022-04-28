// external imports
const Joi = require("joi");

// internal imports
const User = require("../../models/User");

module.exports = createUser = async (req, res, next) => {
    // new schema with joi
    const userCreateSchema = new Joi.object({
        firstName: Joi.string().min(3).max(255).required(),
        lastName: Joi.string().min(3).max(255),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(255).required(),
    });

    try {
        const { error } = await userCreateSchema.validate(req.body);

        if (error)
            return next({ status: 422, message: error.details[0].message });

        const userExist = await User.findOne({ email: req.body.email });
        if (userExist)
            return next({ status: 422, message: "User already exist" });

        const user = await new User(req.body);
        user.password = await user.hashPassword(req.body.password);

        const savedUser = await user.save();
        res.status(201).json({
            error: false,
            user: {
                _id: savedUser._id,
                name: `${savedUser.firstName} ${
                    savedUser?.lastName || ""
                }`.trim(),
                email: savedUser.email,
            },
        });
    } catch (error) {
        next(error);
    }
};
