const multer = require("multer");
const util = require("util");
const date = new Date();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/static/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, date.getTime() + "_" + file.originalname);
  },
});

const uploadImg = multer({ storage: storage }).single("image");
const uploadImgMiddleware = util.promisify(uploadImg);

module.exports = {
  uploadImgMiddleware,
};
