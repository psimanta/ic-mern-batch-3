const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  title: String,
  author: String,
  year: Number,
  available: Boolean,
});

module.exports.Book = model("Book", bookSchema);
