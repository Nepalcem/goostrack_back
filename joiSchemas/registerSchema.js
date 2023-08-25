const Joi = require("joi");

const emailRegexp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

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
  password: Joi.string().required().min(6).messages({
    "string.min": "Password must be at least 6 symbols",
    "any.required": "Missing required password field",
    "string.base": "Password must be a string",
  }),
  token: Joi.string().default(null).messages({
    "string.base": "Token must be a string",
  }),
});

module.exports = registerSchema;
