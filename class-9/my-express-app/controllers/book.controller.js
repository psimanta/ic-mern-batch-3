const { Book } = require("../models/books");

const getBooks = async (req, res) => {
  const books = await Book.find().populate("author");
  res.status(200).json(books);
};

const saveBooks = async (req, res) => {
  const { title, author, year, available } = req.body;
  const result = await Book.create({ title, author, year, available });
  res.status(201).json(result);
};

const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id).populate("author");
  // .select({ "author.dob": 0 });
  if (!book) return res.status(404).json({ message: "Book not found!" });
  res.status(200).json(book);
};

const updateBookById = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json(book);
};

const deleteBookById = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Book was deleted successfully!",
  });
};

module.exports = {
  getBooks,
  saveBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};
