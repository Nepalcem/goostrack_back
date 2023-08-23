const { User } = require("../models/userModel");
const verifyToken = require("../utils/decodeToken");

exports.validateToken = async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).json({ message: "Not authorized" });
  }
  req.user = currentUser;
  next();
};
