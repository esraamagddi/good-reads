const express = require("express");
const CategRouter = express.Router();
const { authorizeAdminsPriv } = require("../middlewares/globalPriv");
const { getAllCategories, getCategory, editCategory, addCategory, deleteCategory } = require('../controllers/categController');

CategRouter.get("/", getAllCategories);
CategRouter.get("/:id", getCategory);
CategRouter.patch("/:id", authorizeAdminsPriv, editCategory);
CategRouter.post("/", authorizeAdminsPriv, addCategory);
CategRouter.delete("/:id", authorizeAdminsPriv, deleteCategory);

module.exports = CategRouter;
