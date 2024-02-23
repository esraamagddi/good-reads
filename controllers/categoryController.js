const Category = require('../models/categoryModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const mongoose = require('mongoose');

exports.getAllCategories = catchAsync(async (req, res, next) => {
    const categories = await Category.find();

    if (!categories) {
        return next(new AppError('No categories found', 404));
    }

    res.json(categories);
});


exports.getCategoryById = catchAsync(async (req, res, next) => {
    const categoryId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return next(new AppError('Invalid category ID', 400));
    }
        const category = await Category.findById(categoryId)
            .populate('author', 'firstName lastName') 
            .populate('category', 'name'); 

        if (!category) {
            return next(new AppError('Category not found', 404));
        }

        res.json({
            _id: category._id,
            name: category.name,
            author: category.author ? `${category.author.firstName} ${category.author.lastName}` : null,
            // categoryName: category.category ? category.category.name : null
        });

});
