const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const { FRONTEND_URL } = process.env;

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  const redirectURL = `${FRONTEND_URL}/login`;

  res.redirect(301, redirectURL);
};

module.exports = verifyEmail;
