const transporter = require("../services/mail.service");

exports.sendVerificationCodeMail = async ({ to, code }) => {
  await transporter.sendMail({
    from: "IC-Ecom",
    to,
    subject: "User verification code",
    html: `<h3>Your verification code is ${code}</h3>`,
  });
};
