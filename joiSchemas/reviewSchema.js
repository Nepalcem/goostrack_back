const Joi = require('joi');

const reviewSchema = Joi.object({
  rating: Joi.number().min(0).max(5).integer().required(),
  comment: Joi.string().max(300).required().messages({
    'any.required': `Missing required comment field`,
  }),
});


module.exports = reviewSchema;