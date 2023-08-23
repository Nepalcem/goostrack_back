const { schema, favoriteSchema } = require("../models/contactModel");
const { isValidObjectId } = require("mongoose");

exports.validateContact = async (req, res, next) => {
  const request = req.body;
  const { error, value } = schema.validate(request);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    req.body = value;
    next();
  }
};

exports.validateFavorite = async (req, res, next) => {
  const request = req.body;
  if (Object.keys(request).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const { error, value } = favoriteSchema.validate(request);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    req.body = value;
    next();
  }
};

exports.validateContactId = async (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return res.status(400).json({ message: "Invalid Contact Id" });
  }
  next();
};
