const validateBody = async (req, res, next) => {
  const request = req.body;
  if (Object.keys(request).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }
  next();
};

module.exports = validateBody;
