const {
    createPost,
    getPosts,
    getPost,
    togglePostLike,
} = require("../../controllers/posts");
const { verifyUser } = require("../../middlewares/auth");

const router = require("express").Router();

router.get("/", getPosts);

router.post("/", verifyUser, createPost);
router.get("/post", verifyUser, getPost);
router.post("/post/like", verifyUser, togglePostLike);

module.exports = router;
