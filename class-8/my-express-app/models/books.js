const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  title: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
  },
  year: Number,
  available: Boolean,
});

module.exports.Book = model("Book", bookSchema);
