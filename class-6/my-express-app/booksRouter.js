const express = require("express");
const { Book } = require("./models/books");

const booksRouter = express.Router();

// CRUD Operations to mongodb using mongoose
booksRouter.get("/", async (req, res) => {
  const books = await Book.find();
  res.status(200).json(books);
});

booksRouter.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found!" });
  res.status(200).json(book);
});

booksRouter.post("/", async (req, res) => {
  try {
    const result = await Book.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({
      message: err?.message || "Bad Request!",
    });
  }
});

booksRouter.put("/:id", async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json(book);
});

booksRouter.delete("/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Book was deleted successfully!",
  });
});

module.exports = booksRouter;
