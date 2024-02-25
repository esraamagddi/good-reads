const express = require("express");
const authorsRouter = express.Router();
const { authorizeAdminsPriv } = require("../middlewares/globalPriv");
const { getAuthorById, updateAuthor, addAuthor, deleteAurthor } = require('../controllers/authorsController');

authorsRouter.get("/:id", getAuthorById);
authorsRouter.patch("/:id", authorizeAdminsPriv, updateAuthor);
authorsRouter.post("/", authorizeAdminsPriv, addAuthor);
authorsRouter.delete("/:id", authorizeAdminsPriv, deleteAurthor);

module.exports = authorsRouter;
