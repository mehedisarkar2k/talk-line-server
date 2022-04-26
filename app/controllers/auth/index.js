const getUser = async (req, res, next) => {
    try {
        const user = req.user;

        res.status(200).json({ error: false, user });
    } catch (error) {
        next(error);
    }
};

module.exports = { getUser };
