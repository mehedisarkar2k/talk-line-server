const { generateToken } = require("../../utils/jwt");

const verifyUser = async (req, res, next) => {
    try {
        const user = req.user;

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

module.exports = { verifyUser };
