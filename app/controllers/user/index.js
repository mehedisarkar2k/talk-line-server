const createUser = (req, res) => {
    const { firstName, email, password } = req.body;

    console.log({ firstName, email, password });
    res.status(201);
};

const getUsers = (req, res) => {};

module.exports = { createUser, getUsers };
