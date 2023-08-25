const Joi = require("joi");

const verificationSchema = Joi.object({
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
  }),
});

module.exports = verificationSchema