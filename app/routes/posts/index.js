const { createPost, getPosts } = require("../../controllers/posts");
const { verifyUser } = require("../../middlewares/auth");

const router = require("express").Router();

router.get("/", getPosts);

router.post("/", verifyUser, createPost);

module.exports = router;
