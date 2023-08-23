const jwt = require("jsonwebtoken");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "..", "environment", ".env") });

const { SECRET_KEY, JWT_EXPIRES_IN } = process.env;

const signToken = (id) =>
  jwt.sign({ id }, SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });

module.exports = signToken;
