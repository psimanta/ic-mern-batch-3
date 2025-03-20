const bcryptjs = require("bcryptjs");

exports.getHashedPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
};

exports.comparePassword = async (givenPassword, savedPassword) => {
  return await bcryptjs.compare(givenPassword, savedPassword);
};
