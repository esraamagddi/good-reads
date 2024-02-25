const multer = require("multer");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    switch (req.baseUrl) {
      case "/admin":
        cb(null, "./utils/imagesUpload/admins");
        break;
      case "/user":
        cb(null, "./utils/imagesUpload/users");
        break;
      case "/author":
        cb(null, "./utils/imagesUpload/authors");
        break;
      case "/book":
        cb(null, "./utils/imagesUpload/books");
        break;
      default:
        cb(null, "./utils/imagesUpload");
        break;
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});


const Upload = multer({
  storage: Storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

module.exports = Upload;
