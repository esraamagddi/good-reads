const bcrypt = require("bcrypt");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const util = require("util");

const signAsync = util.promisify(jwt.sign);

async function getUser(req, res, next) {
  try {
    const id = await loginID(req, res);
    const user = await User.findById(id).select("fName lName email img");
    res.send(user);
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
}

async function editUser(req, res, next) {
  const id = await loginID(req, res);
  const { fName, lName, email, password, img } = req.body;
  try {
    await User.findByIdAndUpdate({_id:id}, {
      $set: {
        fName: fName,
        lName: lName,
        email: email,
        password: password,
        img,
        updated_at: new Date(),
      },
    });
    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
}

async function addUser(req, res, next) {
    const {id}=req.params
  const { fName, lName, email, password, img } = req.body;
  try {
    await User.create({
      _id: id,
      fName,
      lName,
      email,
      password,
      img,
      created_at: new Date(),
    });
    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
}

async function loginUser(req, res, next) {
    const{id} = req.params
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) throw unAuthError;

    const result = await bcrypt.compare(password, user.password);
    if (!result) throw unAuthError;

    const token = await signAsync(
      {
        _id: id,
        name: user.fName + " " + user.lName,
        admin: false,
      },
      process.env.SECRET_KEY
    );

    res.cookie("Authorization", token, { maxAge: 24 * 60 * 60 * 1000 });
    res.send({ _id: id, name: user.fName + " " + user.lName, img: user.img, Authorization: token });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.send({ success: true });
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
}

module.exports = { getUser, editUser, addUser, loginUser, deleteUser };
