const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { HttpError, createToken } = require("../../helpers");

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

  const token = createToken(user._id);

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      username: user.username,
      email: user.email,
    },
  });
};

module.exports = login;
