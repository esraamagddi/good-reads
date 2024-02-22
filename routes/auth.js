const express = require("express");
const router = express.Router();
const multer = require("multer");
const { loginUser, registerUser } = require("../Controllers/authControllers");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
// Init Upload
const upload = multer({
  storage: storage,
});
router.post("/login", loginUser);
router.post("/register", upload.single("myImage"), registerUser);
module.exports = router;
