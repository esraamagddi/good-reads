const Admin = require("../models/admin");
const { customError, unAuthError } = require("../lib/customError");
const util = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signAsync = util.promisify(jwt.sign);

async function getAdminById(req, res, next) {
  const { id } = req.params;
  try {
    const Admin = await Admin.findById(id);
    res.send(Admin);
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
}

async function updateAdmin(req, res, next) {
  const { id } = req.params;
  const { username, email, password, img } = req.body;
  try {
    await Admin.findByIdAndUpdate({_id:id}, {
      $set: {
        username,
        email,
        password,
        img,
      },
    });
    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
}

async function addAdmin(req, res, next) {
    const {id}=req.params;
  const { username, email, password, img } = req.body;
  try {
    await Admin.create({
      _id: id,
      username,
      email,
      password,
      img,
    });
    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
}

async function loginAdmin(req, res, next) {
    const {id}=req.params
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) throw unAuthError;

    //Validate password in DB hashed with entered password
    const result = await bcrypt.compare(password, admin.password);
    if (!result) throw unAuthError;

    const token = await signAsync(
      {
        _id: id,
        name: admin.username,
        admin: true,
      },
      process.env.SECRET_KEY
    );

    res.send({ Authorization: token });
  } catch (error) {
    next(error);
  }
}

async function deleteAdmin(req, res, next) {
  const { id } = req.params;
  try {
    await Admin.findByIdAndDelete(id);
    res.send({ success: true });
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
}

module.exports = {
getAdminById,
  updateAdmin,
  addAdmin,
  loginAdmin,
  deleteAdmin,
};
