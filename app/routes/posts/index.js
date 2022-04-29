const { createPost, getPosts, getPost } = require("../../controllers/posts");
const { verifyUser } = require("../../middlewares/auth");

const router = require("express").Router();

router.get("/", getPosts);

router.post("/", verifyUser, createPost);
router.get("/post", verifyUser, getPost);

module.exports = router;
