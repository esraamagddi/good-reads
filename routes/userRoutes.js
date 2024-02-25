const express = require("express");
const userRouter = express.Router();
const { authorizeUser } = require('../middlewares/user');
const { getUser, editUser, addUser, loginUser, deleteUser } = require('../controllers/userController');

userRouter.get("/", authorizeUser, getUser);
userRouter.patch("/", authorizeUser, editUser);
userRouter.post("/", addUser);
userRouter.post("/login", loginUser);
userRouter.delete("/:id", authorizeUser, deleteUser);

module.exports = userRouter;
