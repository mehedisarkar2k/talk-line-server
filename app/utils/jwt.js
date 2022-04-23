const jwt = require("jsonwebtoken");
const config = require("../../config");

const jwtSecret = config.jwt_secrete;

const generateToken = (payload) => {
    return jwt.sign(payload, jwtSecret, {
        expiresIn: config.jwt_expires_in,
    });
};

module.exports = { generateToken };
