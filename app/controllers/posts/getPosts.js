const Post = require('../../models/Post');

const redisClient = require('../../utils/redisClient');

module.exports = async (req, res, next) => {
  // check if the posts are in the redis cache

  const { perPage = 1, page = 1 } = req.query;

  const skipping = +perPage * (+page - 1),
    totalShow = +perPage + skipping;

  const redisKey = `posts:${totalShow}`;

  try {
    const cachedPosts = await redisClient.get(redisKey);

    if (cachedPosts) {
      console.log('Serving from cache');
      return res.send({ error: false, posts: JSON.parse(cachedPosts) });
    }

    const totalPost = await Post.find().count();

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skipping)
      .limit(+perPage)
      .populate('author', 'firstName lastName image');

    // calculating remaining post
    let remainPost = totalPost - totalShow;
    remainPost = remainPost < 0 ? 0 : remainPost;

    // set the posts in the redis cache
    redisClient.set(redisKey, JSON.stringify(posts));

    res.send({ error: false, posts, remainPost });
  } catch (error) {
    next(error);
  }
};
