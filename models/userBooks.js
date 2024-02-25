const mongoose = require("mongoose");

const userBooksSchema = new mongoose.Schema({
 
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please enter a User"],

  },
  book: {
    type: mongoose.Types.ObjectId,
    ref: "Book",
    required: [true, "Please enter a Book"],
  },
  state: {
    type: String,
    required: true,
    enum:["already read", "currently reading", "wish to read"]
  },
  rating: {
    type: Number,
  },
  review: String,
  created_at: Date,
  updated_at: Date,
});

module.exports = mongoose.model("UserBook", userBooksSchema);
