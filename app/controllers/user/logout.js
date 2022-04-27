module.exports = (req, res) => {
    console.log(req.session);
    req.session.destroy();

    res.status(200).send({ error: false, message: "Logout successfully" });
};
