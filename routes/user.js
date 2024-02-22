const express = require("express");
const router = express.Router();
const multer = require("multer");
const passport = require("passport");
const {getUser,getUsers,deleteUser,updateUser}=require('../Controllers/userController');

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/img");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  // Init Upload
   const upload = multer({
    storage: storage,
  });

 // Check File Type
function checkFileType(file, cb) {
    console.log("check file: ", file);
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(file.originalname).toLowerCase();
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  }

router.get("/:id", passport.authenticate("jwt", { session: false }),getUser);
router.get("/",passport.authenticate("jwt", { session: false }) ,getUsers);
router.delete("/:id",passport.authenticate("jwt", { session: false }) ,deleteUser);
router.patch("/:id", passport.authenticate("jwt", { session: false }),upload.single("myImage"),updateUser);

module.exports = router;
