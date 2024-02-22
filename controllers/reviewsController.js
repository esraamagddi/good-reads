const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const addReview = catchAsync(async (req, res, next) => {
  const review = await Review.create(req.body);
  res.status(201).json(review);
});

const editReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updatedReview = await Review.findByIdAndUpdate(id, req.body, { new: true });

  if (!updatedReview) {
    return next(new AppError('Review not found', 404));
  }

  res.json(updatedReview);
});

const deleteReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deletedReview = await Review.findByIdAndDelete(id);

  if (!deletedReview) {
    return next(new AppError('Review not found', 404));
  }

  res.json({ message: 'Review deleted successfully' });
});

const getReviewById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findById(id);

  if (!review) {
    return next(new AppError('Review not found', 404));
  }

  res.json(review);
});

const getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  res.json(reviews);
});

module.exports = { getAllReviews, getReviewById, deleteReview, editReview, addReview };
