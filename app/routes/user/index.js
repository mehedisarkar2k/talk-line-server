const { createUser, login, logout } = require('../../controllers/user');
const User = require('../../models/User');
const upload = require('../../utils/s3');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).send('this is user api');
});

router.post('/', createUser);
router.post('/login', login);
router.get('/logout', logout);
router.post(
  '/:userId/uploadProfilePic',
  upload.single('file'),
  async (req, res, next) => {
    const userId = req.params.userId;
    console.log(req.params.userId);
    const updateRes = await User.updateOne(
      { _id: userId },
      { image: req.file.location }
    );
    res.json({
      success: true,
      message: 'Profile picture is uploaded successfully!',
      image: req.file.location,
    });
  }
);

module.exports = router;
