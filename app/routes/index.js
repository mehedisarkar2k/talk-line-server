const router = require("express").Router(),
    fs = require("fs"),
    path = require("path");

// here render the api documentation with view engine
router.get("/", (req, res) => {
    res.status(200).send("Welcome to the server api docs");
});

fs.readdirSync(path.join(__dirname)).forEach((file) => {
    const isDirectory = fs.lstatSync(path.join(__dirname, file)).isDirectory();

    if (isDirectory) {
        const subRouter = require(path.join(__dirname, file));
        router.use(`/${file}`, subRouter);
    }
});

module.exports = router;
