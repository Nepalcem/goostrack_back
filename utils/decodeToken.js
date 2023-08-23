const jwt = require("jsonwebtoken");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "..", "environment", ".env") });

const { SECRET_KEY } = process.env;
const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" &&
      error.message === "invalid signature"
    ) {
      return null;
    }
    console.error(error.message);
  }
};

module.exports = verifyToken;
