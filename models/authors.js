const mongoose = require("mongoose");

const authorsSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: [true, "Please enter a first name"],
    minlength: 3,
    maxlength: 30
  },
  lName: {
    type: String,
    required: [true, "Please enter a last name"],
    minlength: 3,
    maxlength: 30
  },
  DOB: {
    type: Date
  },
  info: {
    type: String,
    required: [true, "Please enter some information about you"],
    minlength: 3,
    maxlength: 500
  },
  img: String,
  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model("Author", authorsSchema);
