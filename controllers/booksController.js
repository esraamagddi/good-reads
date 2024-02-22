// const asyncWrapper = require('../lib/asyncWrapper');
// const path = require('path');
const Book = require('../models/booksModel');
const upload = require('../helpers/uploadImg');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

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
    const book = await Book.findById(bookId);

    if (!book) {
        return next(new AppError('Book not found', 404));
    }

    res.json(book);
});

const updateBook = catchAsync(async (req, res, next) => {
    const bookId = req.params.id;
    const updates = req.formData;
    
    if (req.file) {
        updates.image = req.file.path;
    }
    const options = { new: true }; 

    const book = await Book.findOneAndUpdate({ _id: bookId }, updates, options);



    if (!book) {
        return next(new AppError('Book not found', 404));
    }

    res.status(200).json(book);
});



const deleteBook = catchAsync(async (req, res, next) => {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
        return next(new AppError('Book not found', 404));
    }

    await book.deleteOne();
    res.json({ message: 'Deleted Book' });
});

module.exports = { getAllBooks, addBook, getBookDetails, updateBook, deleteBook };
