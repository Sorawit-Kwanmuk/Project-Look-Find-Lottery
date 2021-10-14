const cloundinary = require('cloudinary').v2;
const fs = require('fs');
const util = require('util');
const { User, UserProfile } = require('../models');

const imageUpload = async (req, res, next) => {
  const uploadPromise = util.promisify(cloundinary.uploader.upload);
  // upload.array('cloudinput');
  const { id } = req.params;
  try {
    // console.log('11111');
    // console.log(req.files);
    const files = req.files;
    // console.log(files);
    cloundinary.uploader.upload(
      req.files[0].path,
      { timeout: 60000 },
      (err1, result1) => {
        console.log(err1);
        cloundinary.uploader.upload(
          req.files[1].path,
          { timeout: 60000 },
          async (err2, result2) => {
            console.log(err2);
            const user = await UserProfile.update(
              {
                imageProfile: result1.secure_url,
                qrCodeLine: result2.secure_url,
              },
              {
                where: {
                  userId: id,
                },
              }
            );
            // console.log(user);
            fs.unlinkSync(req.files[0].path);
            fs.unlinkSync(req.files[1].path);
            res.json({ user });
          }
        );
      }
    );

    // const promise = files.map(item => uploadPromise(item.path));
    // const result = await Promise.all(promise);
    // const user = await User.update(
    //   {
    //     imageProfile: result[0].secure_url,
    //     qrCodeLine: result[1].secure_url,
    //   },
    //   {
    //     where: {
    //       userId: id,
    //     },
    //   }
    // );
    // fs.unlinkSync(req.file.path);
    // res.json({ user });
  } catch (error) {
    next(error);
  }
};
const createProfile = async (req, res, next) => {
  util.promisify(cloundinary.uploader.upload);
  const { id } = req.params;

  const { username, name, email, phone, lineId, facebookId, location, etc } =
    req.body;

  try {
    console.log('req.files[1]: ', req.files[1]);
    console.log('req.files[0]: ', req.files[0]);
    cloundinary.uploader.upload(
      req.files[0].path,
      { timeout: 60000 },
      (err1, result1) => {
        console.log(err1);
        cloundinary.uploader.upload(
          req.files[1].path,
          { timeout: 60000 },
          async (err2, result2) => {
            console.log(err2);
            const user = await UserProfile.create({
              username,
              name,
              email,
              phone,
              lineId,
              facebookId,
              location,
              etc,
              imageProfile: result1.secure_url,
              qrCodeLine: result2.secure_url,
              userId: id,
            });

            // console.log(user);
            fs.unlinkSync(req.files[0].path);
            fs.unlinkSync(req.files[1].path);
            res.json({ user });
          }
        );
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = { imageUpload, createProfile };
