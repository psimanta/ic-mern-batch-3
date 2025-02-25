const express = require("express");
const {
  getBooks,
  saveBooks,
  getBookById,
  updateBookById,
  deleteBookById,
} = require("../controllers/book.controller");

const booksRouter = express.Router();

// CRUD Operations to mongodb using mongoose
booksRouter.route("/").get(getBooks).post(saveBooks);

booksRouter
  .route("/:id")
  .get(getBookById)
  .put(updateBookById)
  .delete(deleteBookById);

module.exports = booksRouter;
