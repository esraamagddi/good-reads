const express=require('express');
const { getAllCategories,getCategoryById } = require('../controllers/categoryController');

const categoryRoutes=express.Router();

categoryRoutes.get('/', getAllCategories); //done
categoryRoutes.get('/:id', getCategoryById); //done

module.exports = categoryRoutes;
