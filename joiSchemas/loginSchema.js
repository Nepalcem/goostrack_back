const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    "any.required": "Missing required email field",
    "string.base": "Email must be a string",
  }),
  password: Joi.string().required().messages({
    "any.required": "Missing required password field",
    "string.base": "Password must be a string",
  }),
});

module.exports = loginSchema;
