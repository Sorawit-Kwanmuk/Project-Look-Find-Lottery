const router = require('express').Router();
const uploadController = require('../controllers/uploadController');
const multer = require('multer');

let i = 0;

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(file);
      cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
      i++;
      cb(null, file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

router.put(
  '/upload-to-cloud/:id',
  upload.array('cloudinput'),
  uploadController.imageUpload
);
router.post(
  '/upload-to-cloud/:id',
  upload.array('cloudinput'),
  uploadController.createProfile
);

module.exports = router;
