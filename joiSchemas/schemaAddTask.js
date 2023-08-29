const Joi = require("joi");

const timeRegexp = /^([0-9]{2})\:([0-9]{2})$/;
const dateRegexp = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

const validateStartEndTime = (obj, helpers) => {
  function toMinute(time) {
    const arrTime = time.split(":");
    return Number(arrTime[0]) * 60 + Number(arrTime[1]);
  }
  const { start, end } = obj;

  if (toMinute(start) >= toMinute(end)) {
    return helpers.error("any.invalid");
  }
};

const schemaAddTask = Joi.object({
  title: Joi.string().max(250).required(),
  date: Joi.string().pattern(dateRegexp).min(10).max(10).required().messages({
    "string.pattern.base": `The field "date" must be of the following type "YYYY-MM-DD"`,
  }),
  start: Joi.string().pattern(timeRegexp).min(5).max(5).required().messages({
    "string.pattern.base": `The field "start" must be of the following type "hh:mm"`,
  }),

  end: Joi.string().pattern(timeRegexp).min(5).max(5).required().messages({
    "string.pattern.base": `The field "end" must be of the following type "hh:mm"`,
  }),
  priority: Joi.string().valid("low", "medium", "high").required().messages({
    "string.pattern.base": `The field must be only "low" or "medium" or "high" `,
  }),

  category: Joi.string().valid("to-do", "in-progress", "done").required().messages({
    "string.pattern.base": `The field must be only "to-do" or "in-progress" or "done" `,
  }),

  description: Joi.string().allow(null).allow(""),
})
  .custom(validateStartEndTime)
  .messages({
    "any.invalid": `End should be greater then Start`,
  });

module.exports = schemaAddTask;
