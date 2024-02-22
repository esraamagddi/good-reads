const express=require('express');
const { getAllReviews,getReviewById,deleteReview,editReview,addReview  } = require('../controllers/reviewsController');

const reviewsRoutes=express.Router();

reviewsRoutes.get('/',getAllReviews ); //done
reviewsRoutes.post('/', addReview); //almost done
reviewsRoutes.get('/:id', getReviewById); //done
reviewsRoutes.patch('/:id', editReview); 
reviewsRoutes.delete('/:id', deleteReview); 

module.exports = reviewsRoutes;
