// author
// book

const { Schema, model } = require("mongoose");

const authorSchema = new Schema({
  name: String,
  dob: Date,
});

module.exports.Author = model("Author", authorSchema);
