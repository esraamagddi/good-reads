const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    firstName: { type: String, required: [true, "Please specify the first name"], trim: true },
    lastName: { type: String, required: [true, "Please specify the last name"], trim: true },
    dob: { type: Date },
    bio: { type: String },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;


module.exports = Author;
