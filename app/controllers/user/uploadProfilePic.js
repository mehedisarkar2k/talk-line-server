// external imports
const Joi = require('joi');

// internal imports
const User = require('../../models/User');

module.exports = async (req, res, next) => {
  console.log(req);
  res.send('ok');

  //   try {
  //     const file = req.files.file;
  //     const fileName = file.name;
  //     const params = {
  //       Bucket: 'talk-line',
  //       Key: fileName,
  //       Body: file.data,
  //     };
  //     s3.upload(params, (err, data) => {
  //       if (err) {
  //         next(err);
  //       } else {
  //         res.send(data);
  //       }
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
};
