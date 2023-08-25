const Joi = require("joi");

const emailRegexp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const loginSchema = Joi.object({
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
});

module.exports = loginSchema;
