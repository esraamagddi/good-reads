const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please specify the book name"], maxlength: 100, trim: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: [true, "Please specify the author ID"],
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Please specify the category ID"],
    match: /^[a-zA-Z]*$/,
  },
  rating: [
    {
      rating: { type: Number, min: 1, max: 5 },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  description: { type: String, required: [true, "Please provide a description"] },
  status: {
    type: String,
    enum: ["Want to read", "Read", "Currently Reading"],
    required: [true, "Please specify the status"],
  },
  image: { type: String },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});


const Book = mongoose.model('Book', bookSchema);
module.exports = Book;