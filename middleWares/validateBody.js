const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, error.message));
    }

    next();
  };

  return func;
};

module.exports = validateBody;

// const validateBody = async (req, res, next) => {
//   const request = req.body;
//   if (Object.keys(request).length === 0) {
//     return res.status(400).json({ message: "missing fields" });
//   }
//   next();
// };

// module.exports = validateBody;
