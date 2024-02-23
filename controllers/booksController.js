// const asyncWrapper = require('../lib/asyncWrapper');
// const path = require('path');
const Book = require('../models/booksModel');
const upload = require('../helpers/uploadImg');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const mongoose = require('mongoose');
const getAllBooks = catchAsync(async (req, res, next) => {
    const books = await Book.find({})
        .populate('author', 'firstName lastName'); 

    res.json(books);
});


const addBook = catchAsync(async (req, res, next) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return next(new AppError(err.message, 400));
        }

        const imagePath = req.file.path;

        const bookData = {
            name: req.body.name,
            author: req.body.author,
            category: req.body.category,
            status: req.body.status,
            description: req.body.description,
            image: imagePath
        };

        const book = new Book(bookData);
        const newBook = await book.save();
        res.status(201).json(newBook);
    });
});

const getBookDetails = catchAsync(async (req, res, next) => {
    const bookId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return next(new AppError('Invalid book ID', 400));
    }

    const book = await Book.findById(bookId);

    if (!book) {
        return next(new AppError('Book not found', 404));
    }

    res.json(book);
});

const updateBook = catchAsync(async (req, res, next) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return next(new AppError(err.message, 400));
        }

        const bookId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return next(new AppError('Invalid book ID', 400));
        }
        const updates = req.body;

        if (req.file) {
            updates.image = req.file.path;
        }

        try {
            const book = await Book.findByIdAndUpdate(bookId, updates, { new: true });

            if (!book) {
                return next(new AppError('Book not found', 404));
            }

            res.status(200).json(book);
        } catch (error) {
            return next(new AppError('Error updating book', 500));
        }
    });
});




const deleteBook = catchAsync(async (req, res, next) => {
    const bookId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return next(new AppError('Invalid book ID', 400));
    }
    const book = await Book.findById(bookId);

    if (!book) {
        return next(new AppError('Book not found', 404));
    }

    await book.deleteOne();
    res.json({ message: 'Deleted Book' });
});

const getPopularBooks = catchAsync(async (req, res, next) => {
  
 const currentlyReadingBooks = await Book.find({ status: "Currently Reading" }).populate('author');

        res.json(currentlyReadingBooks);

});


module.exports = { getAllBooks, addBook, getBookDetails, updateBook, deleteBook,getPopularBooks };
