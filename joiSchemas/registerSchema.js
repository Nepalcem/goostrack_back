const Joi = require("joi");

const {
  emailRegexp,
  passwordRegexp,
} = require("../constants/regularExpressions");

const registerSchema = Joi.object({
  username: Joi.string().required().max(16).messages({
    "any.required": "Missing required username field",
    "string.max": "Username must be no more than 16 symbols",
    "string.base": "Username must be a string",
  }),
  email: Joi.string().required().pattern(emailRegexp).messages({
    "string.pattern.base": "Invalid email",
    "any.required": "Missing required email field",
    "string.base": "Email must be a string",
  }),
  password: Joi.string().required().pattern(passwordRegexp).min(8).messages({
    "string.min": "Password must be at least 8 symbols",
    "any.required": "Missing required password field",
    "string.base": "Password must be a string",
    "string.pattern.base":
      "Password must contain at least 1 Upper case letter, 1 lower case letter and be longer than 8 symbols",
  }),
  token: Joi.string().default(null).messages({
    "string.base": "Token must be a string",
  }),
});

module.exports = registerSchema;
