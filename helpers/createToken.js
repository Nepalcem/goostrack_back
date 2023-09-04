const jwt = require("jsonwebtoken");

const { SECRET_KEY, JWT_EXPIRES_IN } = process.env;

const createToken = (id) => {
  const payload = {
    id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
  return token;
};

module.exports = createToken;
