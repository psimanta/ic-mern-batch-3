const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: String,
  password: String,
});

exports.User = model("User", userSchema);
