const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: [true, "Please enter a first name"],
    minlength: 3,
    maxlength: 30,
    trim: true
  },
  lName: {
    type: String,
    required: [true, "Please enter a last name"],
    minlength: 3,
    maxlength: 30,
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "Please enter a valid email address"
    }
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: 8,
  },
  img: String,
  created_at: Date,
  updated_at: Date,
},
{
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
      }
    },
  });

// Hash password before saving
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Hash password before update
userSchema.pre("findOneAndUpdate", async function(next) {
  if (!this._update.$set.password) return next();

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(this._update.$set.password, salt);
    this._update.$set.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
