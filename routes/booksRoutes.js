const express = require("express");
const booksRouter = express.Router();
const { authorizeAdminsPriv } = require("../middlewares/globalPriv");
const { getAllBooks, getBook, getBookById, updateBook, addBook, deleteBook, editUserBookState, addUserBook, editUserBookRating, editUserBookReview, getBookReview,getUserBooks } = require('../controllers/booksController');

booksRouter.get("/", getAllBooks);
booksRouter.get("/", getBook);
booksRouter.get("/:id", getBookById);
booksRouter.patch("/:id", authorizeAdminsPriv, updateBook);
booksRouter.post("/", authorizeAdminsPriv, addBook);
booksRouter.delete("/:id", authorizeAdminsPriv, deleteBook);

booksRouter.patch("/userBook", editUserBookState);
booksRouter.post("/userBook", addUserBook);
booksRouter.patch("/userBook/state/:id", editUserBookRating);
booksRouter.patch("/userBook/review/:id", editUserBookReview);
booksRouter.get("/userBook/review/:id", getBookReview);
app.get("/isLoged", getUserBooks)

module.exports = booksRouter;
