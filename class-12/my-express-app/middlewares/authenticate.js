const { verify } = require("jsonwebtoken");

module.exports.authenticate = async (req, res, next) => {
  const authorization = req.header("Authorization");
  if (!authorization) {
    return res.status(401).json({
      message: "Access denied!",
    });
  }
  // Bearer my-token
  const token = authorization?.split(" ")?.[1];

  try {
    const payload = verify(token, process.env.JWT_PRIVATE_KEY);
    res.locals = { ...payload };
    next();
  } catch (err) {
    res.status(400).json({
      message: "Invalid token!",
    });
  }
};
