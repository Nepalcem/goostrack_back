const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const { SECRET_KEY, JWT_EXPIRES_IN } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (!user.verify) {
    throw HttpError(401, "Please verify your email");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token: token,
    user: {
      username: user.username,
      email: user.email,
      avatar: user.avatarURL,
    },
  });
};

module.exports = login;
