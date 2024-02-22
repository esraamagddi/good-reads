const express=require('express');
const { createAuthor, getAllAuthors, getAuthorById, updateAuthorById, deleteAuthorById} = require('../controllers/authorsController');

const authorRoutes=express.Router();

authorRoutes.get('/', getAllAuthors); //done
authorRoutes.post('/', createAuthor); //almost done
authorRoutes.get('/:id', getAuthorById); //done
authorRoutes.patch('/:id', updateAuthorById); //almost done
authorRoutes.delete('/:id', deleteAuthorById); //almost done

module.exports = authorRoutes;
