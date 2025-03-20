const { Schema, model } = require("mongoose");
const { getHashedPassword } = require("../lib/auth");
const { OTP } = require("./otp");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  this.password = await getHashedPassword(this.password);
  next();
});

userSchema.post("save", async function () {
  const otp = new OTP({
    email: this.email,
  });
  otp.save();
});

exports.User = model("User", userSchema);

// user email => otp => verify =>
