const User = require("../models/User");

const verifyUser = async (req, res, next) => {
    const newUser = new User();
    const token = req.session.token;

    if (!token) return next({ status: 401, message: "You are not logged in." });

    try {
        const decode = await newUser.verifyToken(token);

        const user = await User.findById(decode.sub).select(
            "id email firstName lastName"
        );

        if (!user) return next({ status: 401, message: "Unauthenticated" });

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { verifyUser };
