// external imports
const router = require("express").Router();

// internal imports
const { getUser } = require("../../controllers/auth");
const { verifyUser } = require("../../middlewares/auth");

router.use("/", verifyUser);

router.get("/", getUser);

module.exports = router;
