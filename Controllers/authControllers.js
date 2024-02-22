const JWT = require("../utils/JWT");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const multer = require("multer");

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

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // User not found
    if (!user)
      return res.status(404).send({ message: "User not found" });

    const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const jwt = JWT.JWT(user);
    delete user._doc.password;

    return res.status(200).send({ user: user, token: jwt.token, expiresIn: jwt.expires });
  } catch (error) {
    return res.status(400).send({ message: "Invalid data" });
  }
};
const registerUser = async (req, res) => {
  // Set default photo path
  let photo = "public/img/photos";

  // Check if file has been uploaded
  if (req.file) {
    // Construct photo path using uploaded file's destination and filename
    photo = req.file.destination + req.file.filename;
  }

  // Extract email, firstName, lastName, and password from request body
  const { email, firstName, lastName, password } = req.body;

  try {
    // Create user with provided data
    let user = await User.create({
      email,
      firstName,
      lastName,
      password,
      photo,
    });

    // Generate JWT token for the created user
    const jwt = JWT.JWT(user);

    // Remove password from user object before sending response
    delete user._doc.password;

    // Send response with created user data and JWT token

    return res.status(201).send({ token: jwt.token, expiresIn: jwt.expires });
  } catch (error) {
    // If an error occurs during user creation, send error message in response
    return res.status(400).send({ message: error.message });
  }
};

module.exports = { loginUser, registerUser };
