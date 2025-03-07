const express = require("express");
const {
  getBooks,
  saveBooks,
  getBookById,
  updateBookById,
  deleteBookById,
} = require("../controllers/book.controller");
const { authenticate } = require("../middlewares/authenticate");
const { authorize } = require("../middlewares/authorize");

const booksRouter = express.Router();

// CRUD Operations to mongodb using mongoose
booksRouter.route("/").get(getBooks).post(authenticate, saveBooks);

booksRouter
  .route("/:id")
  .get(getBookById)
  .put(authenticate, updateBookById)
  .delete([authenticate, authorize], deleteBookById);

module.exports = booksRouter;
