const multer = require("multer");
const util = require("util");
const gridFsStorage = require("multer-gridfs-storage");
const maxSize = 1024 * 1024;
const dotenv = require("dotenv");
dotenv.config();

const storage = new gridFsStorage({
  url: process.env.DB_HOST,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}_${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "images",
      filename: `${Date.now()}_${file.originalname}`,
    };
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
