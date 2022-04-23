const router = require("express").Router();

router.get("/", (req, res) => {
    res.status(200).send("welcome to v1 api docs");
});

module.exports = router;
