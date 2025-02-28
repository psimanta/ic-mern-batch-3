const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  title: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
  },
  price: Number,
  sales: Number,
  genre: String,
});

module.exports.Book = model("Book", bookSchema);
