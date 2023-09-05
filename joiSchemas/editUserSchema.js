const Joi = require("joi").extend(require("@joi/date"));

const { emailRegexp, phoneRegexp } = require("../constants/regularExpressions");

const editUserSchema = Joi.object({
  username: Joi.string().max(16).messages({
    "string.max": "Username must be no more than 16 symbols",
    "string.base": "Username must be a string",
  }),
  email: Joi.string().pattern(emailRegexp).messages({
    "string.pattern.base": "Invalid email",
    "string.base": "Email must be a string",
  }),
  phone: Joi.string().pattern(phoneRegexp).messages({
    "string.pattern.base": "Phone format must be +380xxxxxxxxx",
    "string.base": "phone must be a string",
  }),
  birthday: Joi.date().format("YYYY-MM-DD").messages({
    "any.format": "birthday must be YYYY-MM-DD",
    "any.base": "birthday must be a date",
  }),
  skype: Joi.string().max(16).messages({
    "string.base": "skype must be a string",
    "string.max": "skype must be no more than 16 symbols",
  }),
});

module.exports = editUserSchema;
