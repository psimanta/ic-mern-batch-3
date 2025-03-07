module.exports.authorize = async (req, res, next) => {
  if (res?.locals?.role !== "admin") {
    return res.status(403).json({
      message: "Unauthorized!",
    });
  }
  next();
};
