const fs = require("fs/promises");

const { HttpError } = require("../helpers");

const validateImage = () => {
  return async (req, res, next) => {
    if (req.files.length === 0) {
      return next();
    }
    if (req.files.length > 1) {
      req.files.map(async (file) => await fs.unlink(file.path));
      next(HttpError(400, "Only one image allowed"));
    }
    if (req.files[0].fieldname !== "avatarURL") {
      await fs.unlink(req.files[0].path);
      next(HttpError(400, "fieldname must be 'avatarURL'"));
    }
    if (
      req.files[0].mimetype !== "image/jpeg" &&
      req.files[0].mimetype !== "image/png"
    ) {
      await fs.unlink(req.files[0].path);
      next(HttpError(400, "file type must be jpg, jpeg, png"));
    }
    next();
  };
};

module.exports = validateImage;
