const multer = require("multer");
const util = require("util");
const date = new Date();
const maxSize = 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const url = req.protocol + "://" + req.get("host");
    cb(null, url + "/static/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, date.getTime() + "_" + file.originalname);
  },
});

const uploadImg = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("image");
const uploadImgMiddleware = util.promisify(uploadImg);

module.exports = {
  uploadImgMiddleware,
};
