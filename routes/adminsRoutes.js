const express = require("express");
const AdminRouter = express.Router();
const { authorizeAdmin } = require('../middlewares/admin');
const { getAdminById, updateAdmin, addAdmin, loginAdmin, deleteAdmin } = require('../controllers/adminsController');

AdminRouter.get("/:id", authorizeAdmin, getAdminById);
AdminRouter.patch("/:id", authorizeAdmin, updateAdmin);
AdminRouter.post("/", addAdmin);
AdminRouter.post("/login", loginAdmin);
AdminRouter.delete("/:id", authorizeAdmin, deleteAdmin);

module.exports = AdminRouter;
