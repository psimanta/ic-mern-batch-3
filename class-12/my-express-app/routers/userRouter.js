const express = require("express");
const { register, login, verify } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/register", register); // user/register
userRouter.post("/login", login); // user/login

userRouter.post("/verify", verify);

module.exports = userRouter;
