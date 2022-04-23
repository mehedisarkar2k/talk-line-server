// external imports
const router = require("express").Router();

// internal imports
const { verifyUser } = require("../../controllers/auth");
const { verifyToken } = require("../../middlewares/auth");

router.use("/", verifyToken);

router.get("/", verifyUser);

module.exports = router;
