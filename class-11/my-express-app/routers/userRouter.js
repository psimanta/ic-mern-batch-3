const express = require("express");
const { register, login } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/register", register); // user/register
userRouter.post("/login", login); // user/login

module.exports = userRouter;
