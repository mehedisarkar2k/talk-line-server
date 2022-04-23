const bcrypt = require("bcrypt");

const hashedPass = async (password) => {
    const salt = await bcrypt.genSalt(10);

    return (hashedPassword = await bcrypt.hash(password, salt));
};

const isValidPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = { hashedPass, isValidPassword };
