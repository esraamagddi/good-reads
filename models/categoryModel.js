const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: [true, "Please specify the category name"], trim: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: [true, "Please specify the author ID"] },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: [true, "Please specify the category ID"] },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

