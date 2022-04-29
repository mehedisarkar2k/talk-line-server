const {
    createPost,
    getPosts,
    getPost,
    togglePostLike,
    createComment,
    getComment,
} = require("../../controllers/posts");

const { verifyUser } = require("../../middlewares/auth");

const router = require("express").Router();

router.get("/", getPosts);

router.post("/", verifyUser, createPost);
router.get("/post", verifyUser, getPost);
router.post("/post/like", verifyUser, togglePostLike);
router.post("/post/comment", verifyUser, createComment);
router.get("/post/comment", verifyUser, getComment);

module.exports = router;
