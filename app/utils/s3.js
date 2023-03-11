const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { s3AccessKey, s3SecretKey, s3Endpoint } = require('../../config');

//configure aws with your access key and secret key

//create s3 instance
const s3 = new aws.S3({
  accessKeyId: s3AccessKey,
  secretAccessKey: s3SecretKey,
  endpoint: s3Endpoint,
});

//multer s3 setup
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'talk-line',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + file.originalname);
    },
  }),
});

module.exports = upload;
