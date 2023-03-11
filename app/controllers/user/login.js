// external imports
const Joi = require('joi');

// internal imports
const User = require('../../models/User');

module.exports = async (req, res, next) => {
  const loginSchema = new Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });

  try {
    const { error } = await loginSchema.validate(req.body);
    if (error) return next({ status: 422, message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return next({ status: 400, message: 'Invalid credentials!' });

    const isValid = await user.comparePassword(req.body.password);
    if (!isValid) return next({ status: 400, message: 'Invalid credentials!' });

    res.status(200).json({
      error: false,
      message: 'Login successful!',
      token: await user.generateToken(),
      userId: user.id,
    });
  } catch (error) {
    next(error);
  }
};
