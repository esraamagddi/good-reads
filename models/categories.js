const mongoose = require("mongoose");

const CategSchema = new mongoose.Schema({
  _id: {
    type: Number,
    min: 0,
  },
  Name: {
    type: String,
    required: [true, "Please enter a category name"],
    unique: true,
    minlength: 3,
    maxlength: 50
  },
  created_at: Date,
  updated_at: Date,
});

module.exports = mongoose.model("Category", CategSchema);
