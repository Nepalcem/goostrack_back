const Joi = require("joi");

const emailRegexp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const passwordRegexp =
  /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const loginSchema = Joi.object({
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
});

module.exports = loginSchema;
