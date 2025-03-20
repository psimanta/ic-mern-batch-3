const { Schema, model } = require("mongoose");
const { sendVerificationCodeMail } = require("../lib/mail");

const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    default: (Math.random() * 10 ** 6).toFixed(0),
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 2,
  },
});

otpSchema.post("save", async function () {
  sendVerificationCodeMail({
    to: this.email,
    code: this.otp,
  });
});

exports.OTP = model("OTP", otpSchema);
