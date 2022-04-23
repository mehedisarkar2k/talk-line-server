const createUser = (req, res) => {
    res.status(201).send("create user from controller");
};

const getUsers = (req, res) => {};

module.exports = { createUser, getUsers };
