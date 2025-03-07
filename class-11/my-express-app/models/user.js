const { Schema, model } = require("mongoose");
const { getHashedPassword } = require("../lib/auth");

const userSchema = new Schema({
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  this.password = await getHashedPassword(this.password);
  next();
});

exports.User = model("User", userSchema);
