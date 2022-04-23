const { createUser } = require("../../controllers/user");

const router = require("express").Router();

router.get("/", (req, res) => {
    res.status(200).send("this is user api");
});

router.post("/", createUser);

module.exports = router;
