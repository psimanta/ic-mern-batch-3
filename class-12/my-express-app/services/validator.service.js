const Joi = require("joi");

exports.userValidatorSchema = Joi.object({
  email: Joi.string().email().min(3).max(100).required(),
  password: Joi.string().min(6).required(),
});
