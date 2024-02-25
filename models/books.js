const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a Title"],
    minlength: 3,
    maxlength: 30,
    trim: true
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: [true, "Please enter a Category"],
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "Author",
    required: [true, "Please enter an Author"],
  },
  description: {
    type: String,
    required: [true, "Please enter a Description"],
    minlength: 3,
    maxlength: 500,
    trim: true
  },
  img: String,
  created_at: Date,
  updated_at: Date,
});

module.exports = mongoose.model("Book", booksSchema);
