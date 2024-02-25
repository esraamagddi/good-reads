const Book = require("../models/books");
const userBook = require("../models/userBooks");
const User = require("../models/users");
const { customError } = require("../lib/customError");
const { loginID } = require("../middlewares/globalPriv");
const Category = require("../models/categories");
const Author = require("../models/authors");



async function getAllBooks(req, res, next) {
  try {
    const books = await Book.find({});
    res.send(books);
  } catch (error) {
    console.log(error);
  }
}

async function getBook(req, res, next) {
    try {
      let query = Book.find({});
      
      if (req.query.title) {
        query = Book.find({ title: req.query.title }); // Modify query to filter by title
      }
      query = query.populate({ path: "category", select: "Name" })
                   .populate({ path: "author", select: "fName lName DOB img" });
      const Books = await query.exec();
      
      res.send(Books);
    } catch (error) {
      next(customError(422, "VALIDATION_ERROR", error));
    }
  }

async function getBookById(req, res, next) {
  const { id } = req.params;
  try {
    const Book = await Book.findById(id)
      .populate({ path: "category", select: "Name" })
      .populate({ path: "auhtor", select: "fName lName DOB img" }).exec();
    res.send(Book);
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
}

async function updateBook(req, res, next) {
  const { id } = req.params;
  const { title, category, auhtor, description, img } = req.body;
  try {
    await Book.findByIdAndUpdate({_id:id}, {
      $set: {
        title,
        category: await Category.findOne({ _id: category }),
        auhtor: await Author.findOne({ _id: auhtor }),
        description,
        img,
        updated_at: new Date(),
      },
    });
    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
}

async function addBook(req, res, next) {
    const {id}=req.params;
  const { title, category, auhtor, description, img } = req.body;

  try {
    await Book.create({
      _id: id,
      title,
      category: await Category.findById({ _id: category }),
      auhtor: await Author.findById({ _id: auhtor }),
      description,
      img,
      created_at: new Date(),
    });
    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
}

async function deleteBook(req, res, next) {
  const { id } = req.params;
  try {
    await Book.findByIdAndDelete(id);
    res.send({ success: true });
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
}

async function editUserBookState(req, res, next) {
  const user = await loginID(req, res);
  const { book, state, rating, review } = req.body;
  try {
    const state = await userBook.updateMany({ user: user, book: book }, {
      "$set": {
        state,
        rating,
        review,
        updated_at: new Date(),
      },
    });
    if (state.modifiedCount !== 0) res.sendStatus(222);
    else res.sendStatus(555);

  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
}

async function addUserBook(req, res, next) {
    const {id} = req.params
  const { book, state, rating, review } = req.body;
  const user = await loginID(req, res);
  try {
    const Book = await userBook.find({ book: book, user: user });
      await userBook.create({
        _id: await id,
        user: await User.findById({ _id: await loginID(req) }),
        book: await Book.findById({ _id: book }),
        state,
        rating,
        review,
        created_at: new Date(),
      });
      res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
}


async function editUserBookRating(req, res, next) {
  const { id } = req.params;
  const { rating } = req.body;
  try {
    await userBook.findByIdAndUpdate({_id:id}, {
      $set: {
        rating,
        updated_at: new Date(),
      },
    });
    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
}

async function editUserBookReview(req, res, next) {
  const { id } = req.params;
  const { review } = req.body;
  try {
    await userBook.findByIdAndUpdate({_id:id}, {
      $set: {
        review,
        updated_at: new Date(),
      },
    });
    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
}

async function getBookReview(req, res, next) {
  const { id } = req.params;
  try {
    const Book = await userBook.find({ _id: id }, "review")
    res.send(Book);
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
}
async function addUserBook(req, res, next) {
    const { id } = req.params;
    const { book, state, rating, review } = req.body;
    const user = await loginID(req, res);
    try {
      const Book = await userBook.find({ book: book, user: user });
      await userBook.create({
        _id: await id,
        user: await User.findById({ _id: await loginID(req) }),
        book: await Book.findById({ _id: book }),
        state,
        rating,
        review,
        created_at: new Date(),
      });
      res.send({ success: true });
    } catch (error) {
      next(customError(422, "VALIDATION_ERROR", error));
    }
  }

module.exports = {
  getAllBooks,
  getBook,
  getBookById,
  updateBook,
  addBook,
  deleteBook,
  editUserBookState,
  addUserBook,
  editUserBookRating,
  editUserBookReview,
  getBookReview,
  getUserBooks
};
