const { Schema, model } = require("mongoose");

// CRUD
const movieSchema = new Schema({});

module.exports.Movie = model("Movie", movieSchema);
