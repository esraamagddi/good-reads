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
    // console.log(authorId);
    // if(    mongoose.isValidObjectId){

    // }
        const author = await Author.findById(authorId);
        if (!author) {
            console.log("nnn") ;

            return next(new AppError('CastError', 400));
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
    const authorId = req.params.id;
    const updates = req.body;

    if (req.file) {
        updates.image = req.file.path;
    }

    const author = await Author.findByIdAndUpdate(authorId, updates, { new: true });

    if (!author) {
        return next(new AppError('Author not found', 404));
    }

    res.json(author);
});



const deleteAuthorById = catchAsync(async (req, res, next) => {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
        return next(new AppError('Author not found', 404));
    }
    res.json({ message: 'Author deleted successfully' });
});

module.exports = { createAuthor, getAllAuthors, getAuthorById, updateAuthorById, deleteAuthorById };
