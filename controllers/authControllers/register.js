const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");

const { HttpError, sendEmail } = require("../../helpers");
const { User } = require("../../models");

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  await User.create({
    ...req.body,
    password: hashedPassword,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href='${BASE_URL}/auth/verify/${verificationToken}'>Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    message: "Please verify your email",
  });
};

module.exports = register;
