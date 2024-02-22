const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "Please specify the author ID"] },
  rating: { type: Number, required: [true, "Please specify the rating"] },
  text: { type: String },
  createdAt: { type: Date, default: Date.now },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: [true, "Please specify the book ID"] },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
