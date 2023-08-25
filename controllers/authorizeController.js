const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
// const path = require("path");
// const fs = require("fs/promises");

const { ctrlWrapper, HttpError, sendEmail } = require("../helpers");
const { User } = require("../models");

const { SECRET_KEY, BASE_URL, JWT_EXPIRES_IN } = process.env;

// const avatarDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href='${BASE_URL}/users/verify/${verificationToken}'>Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      username: newUser.username,
      email: newUser.email,
    },
  });
};

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
  res.json({
    message: "Verification successful",
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href='${BASE_URL}/users/verify/${user.verificationToken}'>Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

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

module.exports = {
  register: ctrlWrapper(register),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
};
