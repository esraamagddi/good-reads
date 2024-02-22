const mongoose = require("mongoose");
const iDValidator = require("mongoose-id-validator");
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt = require("bcrypt");

// create user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email address",
    ],
    trim: true,
  },
  firstName: {
    type: String,
    required: "First name is required",
    minLength: [3, "First name must be at least 3 chars"],
    maxLength: [25, "First name must not exceed 25 chars"],
    trim: true,
  },
  lastName: {
    required: "Last name is required",
    type: String,
    minLength: [3, "Last name must be at least 3 chars"],
    maxLength: [25, "Last name must not exceed 25 chars"],
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: "Password is required",
  },

  photo: {
    type: String,
    default: "default.png",
  },
  
},
{
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password;
    }
  },
});

const passwordHash = async function (next) {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
};

userSchema.index({ email: 1 }, { unique: true });
// apply password hash hook
userSchema.pre("save", passwordHash);//preupdate

userSchema.methods.verifyPassword = async function verifyPassword(password) {
  const valid = await bcrypt.compare(password, this.password);
  return valid;
};

//Add pagination plugin
userSchema.plugin(mongoosePaginate);

//add ref id validator
userSchema.plugin(iDValidator, {
  message: "Invalid reference , record not found",
});

module.exports = mongoose.model("User", userSchema);
