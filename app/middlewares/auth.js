const User = require("../models/User");

const verifyUser = async (req, res, next) => {
    const newUser = new User();
    // get Authorization header
    const authHeader = req.headers.authorization;
    // check if authHeader is undefined
    if (!authHeader)
        return next({ status: 401, message: "No header provided" });

    // get token from authHeader
    const auhToken = authHeader.split(" ");

    // check athToken contains Bearer and token formate with thee period
    if (auhToken[0] !== "Bearer" || auhToken[1].split(".").length !== 3) {
        return next({ status: 401, message: "Invalid header format" });
    }

    try {
        const token = auhToken[1];
        const decode = await newUser.verifyToken(token);

        const user = await User.findById(decode.sub).select(
            "id email firstName lastName image"
        );

        if (!user) return next({ status: 401, message: "Unauthenticated" });

        req.user = user;

        next();
    } catch (error) {
        console.log({ error });
        next(error);
    }
};

module.exports = { verifyUser };
