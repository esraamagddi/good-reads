const Category = require("../models/categories");
const { customError } = require("../lib/customError");


async function getAllCategories(req, res, next) {
  try {
    const categories = await Category.find({});
    res.send(categories);
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
}

async function getCategory(req, res, next) {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    res.send(category);
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
}

async function editCategory(req, res, next) {
  const { id } = req.params;
  const { Name } = req.body;
  try {
    await Category.findByIdAndUpdate({_id:id}, {
      $set: {
        Name,
        updated_at: new Date(),
      },
    });
    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
}

async function addCategory(req, res, next) {
    const{id}=req.params
  const { Name } = req.body;
  try {
    await Category.create({
      _id: id,
      Name,
      created_at: new Date(),
    });
    res.send({ success: true });
  } catch (error) {
    next(customError(422, "VALIDATION_ERROR", error));
  }
}

async function deleteCategory(req, res, next) {
  const { id } = req.params;
  try {
    await Category.findByIdAndDelete(id);
    res.send({ success: true });
  } catch (error) {
    next(customError(error.code, "VALIDATION_ERROR", error));
  }
}

module.exports = { getAllCategories, getCategory, editCategory, addCategory, deleteCategory };
