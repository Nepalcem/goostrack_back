const Joi = require("joi").extend(require("@joi/date"));

const emailRegexp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

const phoneRegexp =
  // eslint-disable-next-line no-useless-escape
  /^[\+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/;

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
    "string.pattern.base": "Invalid phone number",
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
