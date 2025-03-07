const { getHashedPassword, comparePassword } = require("../lib/auth");
const { User } = require("../models/user");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({
      email,
    });

    if (user) {
      return res.status(400).json({
        message: "User already exists!",
      });
    }

    const hashedPassword = await getHashedPassword(password);

    await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registration successful!",
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

    res.status(200).json({
      message: "Login successful!",
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Something went wrong!",
    });
  }
};
