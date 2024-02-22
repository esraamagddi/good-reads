const express=require('express');
const { getAllBooks, addBook, getBookDetails, updateBook, deleteBook } = require('../controllers/booksController');

const booksRoutes=express.Router();

booksRoutes.get('/', getAllBooks); //done
booksRoutes.post('/', addBook); //almost done
booksRoutes.get('/:id', getBookDetails); //done
booksRoutes.patch('/:id', updateBook); 
booksRoutes.delete('/:id', deleteBook); 

module.exports = booksRoutes;
