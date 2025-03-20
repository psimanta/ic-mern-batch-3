const { comparePassword } = require("../lib/auth");
const { User } = require("../models/user");
const { OTP } = require("../models/otp");
const jwt = require("jsonwebtoken");
const { userValidatorSchema } = require("../services/validator.service");
const { pick } = require("lodash");

exports.register = async (req, res) => {
  try {
    const { error } = userValidatorSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: `Bad Request! ${error?.details?.[0]?.message}`,
      });
    }

    const payload = pick(req.body, ["email", "password"]);
    const { email, password } = payload;

    let user = await User.findOne({
      email,
    });

    if (user) {
      return res.status(400).json({
        message: "User already exists!",
      });
    }

    user = new User({
      email,
      password,
    });

    await user.save();

    res.status(201).json({
      message:
        "User registration successful! A verification code has been sent!",
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Something went wrong!",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid Credential!",
      });
    }

    if (!user.confirmed) {
      return res.status(401).json({
        message: "User is not verified yet!",
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
      },
      process.env.JWT_PRIVATE_KEY
    );

    res.status(200).json({
      message: "Login successful!",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Something went wrong!",
    });
  }
};

exports.verify = async (req, res) => {
  try {
    const { email, otp } = req?.body || {};

    const user = await User.findOne({
      email,
    });

    if (user && user.confirmed) {
      return res.status(400).json({
        message: "User is already verified!",
      });
    }
    const verifiedOtp = OTP.findOne({
      email,
      otp,
    });

    if (verifiedOtp && user) {
      await User.findOneAndUpdate(
        {
          email,
        },
        {
          confirmed: true,
        }
      );

      await OTP.deleteMany({
        email,
      });

      return res.status(200).json({
        message: "User verified successfully!",
      });
    }

    return res.status(400).json({
      message: "Invalid verification code!",
    });
  } catch (err) {
    res.status(500).json({
      message: error?.message || "Something went wrong!",
    });
  }
};
