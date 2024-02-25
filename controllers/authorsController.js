const Author = require("../models/authors");
const { customError } = require("../lib/customError");


async function getAuthorById(req, res, next) {
  const { id } = req.params;
  try {
    const Auth = await Author.findById(id);
    res.send(Auth);
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
}

async function updateAuthor(req, res, next) {
  const { id } = req.params;
  const { fName, lName, DOB, info, img } = req.body;
  try {
    await Author.findByIdAndUpdate({_id:id}, {
      $set: {
        fName: fName,
        lName: lName,
        DOB: DOB,
        info,
        img,
        updated_at: new Date(),
      },
    });
    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
}

async function addAuthor(req, res, next) {
    const {id}=req.params;
    const { fName, lName, DOB, info, img } = req.body;

  try {
    // Add Author data to AuthorTable
    await Author.create({
      _id: id,
      fName: fName,
      lName: lName,
      DOB: DOB,
      info,
      img,
      created_at: new Date(),
    });

    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
}

async function deleteAurthor(req, res, next) {
  const { id } = req.params;
  try {
    await Author.findByIdAndDelete(id);
    res.send({ success: true });
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
}

module.exports = {
 getAuthorById,
 updateAuthor,
  addAuthor,
  deleteAurthor,
};
