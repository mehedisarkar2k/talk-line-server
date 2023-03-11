// internal imports
const Post = require('../../models/Post');

const redisClient = require('../../utils/redisClient');

module.exports = async (req, res, next) => {
  const { postId } = req.query;

  const redisKey = `post:${postId}`;

  if (!postId) return next({ status: 404, message: 'Invalid Post Id' });

  try {
    const cachedPost = await redisClient.get(redisKey);

    if (cachedPost) {
      console.log('Serving from cache');
      return res.send({ error: false, post: JSON.parse(cachedPost) });
    }

    const post = await Post.findById(postId).populate(
      'author',
      'firstName lastName image'
    );
    // .populate("likes", "author image")
    // .populate("comments", "author image createdAt");

    if (!post) return next({ status: 404, message: 'Invalid Post Id' });

    // set the posts in the redis cache
    redisClient.set(redisKey, JSON.stringify(post));

    res.send({ error: false, post });
  } catch (error) {
    next(error);
  }
};
