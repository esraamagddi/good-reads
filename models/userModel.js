const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true, 
    minlength: 2,
    match: /^[a-zA-Z]*$/,
  },
  lastName: {
    type: String,
    required: true,
    trim: true, 
    minlength: 2,
    match: /^[a-zA-Z]*$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, 
    lowercase: true, 
    match:
      // /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,

  },
  password: { type: String, required: true, minlength: 8 },
  image: { type: String },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  admin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },

});

const User = mongoose.model("User", userSchema);

module.exports = User;
