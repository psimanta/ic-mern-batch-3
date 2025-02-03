const express = require("express");
const { readFile, writeFile } = require("./lib/bookManager");

const booksRouter = express.Router();

booksRouter.get("/", (req, res) => {
    const books = readFile();
    res.status(200).json(books);
});

booksRouter.get("/:id", (req, res) => {
    const books = readFile();
    const book = books.find((b) => b.id === parseInt(req.params.id));

    if (!book) return res.status(404).json({ message: "Book not found!" });

    res.status(200).json(book);
});

booksRouter.post("/", (req, res) => {
    const { title, author } = req.body;
    const books = readFile();
    const newBook = {
        id: books.length + 1,
        title,
        author,
    };
    books.push(newBook);
    writeFile(books);

    res.status(201).json(newBook);
});

booksRouter.put("/:id", (req, res) => {
    const { title, author } = req.body;
    const books = readFile();
    const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
    if (bookIndex === -1)
        return res.status(404).json({
            message: "Book was not found!",
        });

    books[bookIndex] = {
        ...books[bookIndex],
        title: title || books[bookIndex].title,
        author: author || books[bookIndex].author,
    };
    writeFile(books);
    res.status(200).json(books[bookIndex]);
});

booksRouter.delete("/:id", (req, res) => {
    const books = readFile();
    const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
    if (bookIndex === -1)
        return res.status(404).json({
            message: "Book was not found!",
        });
    books.splice(bookIndex, 1);
    writeFile(books);
    res.status(200).json({
        message: "Book was deleted successfully!",
    });
});

module.exports = booksRouter;
