const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  return (req, res, next) => {
    if (!Object.keys(req.body).length && !req.file) {
      return next(HttpError(400, "Missing fields"));
    }
    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, `${error.message.replace(/"/g, "")}`));
    }

    next();
  };
};

module.exports = validateBody;
