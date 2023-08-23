const { User } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const signToken = require("../utils/signToken");

exports.registrationController = async (req, res) => {
  const { password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      ...req.body,
      password: hashedPassword,
    };

    const createdUser = await User.create(newUser);
    return res.status(201).json({
      user: {
        email: createdUser.email,
        subscription: createdUser.subscription,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
};

exports.authorizationController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = signToken(user.id);
    await User.findByIdAndUpdate(user._id, { token });

    return res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
};

exports.getCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

exports.logoutUser = async (req, res) => {
  const { _id } = req.user;
  try {
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error.message);
  }
};

exports.updateSubscription = async (req,res, next) => {
  const {_id} = req.user;
  const {subscription} = req.body;
  try {
    await User.findByIdAndUpdate(_id, { subscription });
    return res.status(200).json({ message: "Subscription updated successfully" });
  } catch (error) {
    console.error(error.message);
  }
}
