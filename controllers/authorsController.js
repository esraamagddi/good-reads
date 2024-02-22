const Author = require('../models/autherModel');
const Book = require('../models/booksModel');
const upload = require('../helpers/uploadImg');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const createAuthor = catchAsync(async (req, res, next) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return next(new AppError(err.message, 400));
        }

        const imagePath = req.file.path;

        const authorData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dob: req.body.dob,
            bio: req.body.bio,
            image: imagePath
        };

        const author = await Author.create(authorData);
        res.status(201).json(author);
    });
});


const getAllAuthors = catchAsync(async (req, res, next) => {
    const authors = await Author.find();
    res.json(authors);
});

const getAuthorById = catchAsync(async (req, res) => {
        const authorId = req.params.id;

        const author = await Author.findById(authorId).exec();

        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        const books = await Book.find({ author: authorId }).exec();

        const formattedBooks = books.map(book => ({
            name: book.name,
            ratings: book.rating.map(rating => rating.rating).join(' - '),
            status: book.status,
        }));

        const response = {
            author: {
                firstName: author.firstName,
                lastName: author.lastName,
                dob: author.dob,
            },
            books: formattedBooks,
        };

        res.json(response);

});


const updateAuthorById = catchAsync(async (req, res, next) => {
    try {
        const updates = {};
        Object.keys(req.body).forEach((key) => {
            updates[key] = req.body[key];
        });

        const author = await Author.findOneAndUpdate({ _id: req.params.id }, updates, { new: true, runValidators: true });
        if (!author) {
            return next(new AppError('Author not found', 404));
        }
        res.json(author);
    } catch (error) {
        return next(error);
    }
});


const deleteAuthorById = catchAsync(async (req, res, next) => {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
        return next(new AppError('Author not found', 404));
    }
    res.json({ message: 'Author deleted successfully' });
});

module.exports = { createAuthor, getAllAuthors, getAuthorById, updateAuthorById, deleteAuthorById };
