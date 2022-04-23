const { verify } = require("../utils/jwt");

const verifyToken = async (req, res, next) => {
    const headers = req.headers;
    const authorization = headers["x-access-token"] || headers["authorization"];
    if (!authorization) return next(new Error("No authorization provided"));

    const token = authorization.split("Bearer ")[1];
    if (!token) return next(new Error("Invalid authorization formate"));

    try {
        const user = verify(token);
        if (!user) return next({ status: 401, message: "Invalid token" });

        req.user = user;
        next();
    } catch (error) {
        next({ status: 401, message: "Invalid token" });
    }
};

module.exports = { verifyToken };
