const { ctrlWrapper } = require("../../helpers");

const register = require("./register");
const login = require("./login");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");
const logout = require("./logout");
const getCurrentUser = require("./getCurrentUser");
const editUser = require("./editUser");
const changeAvatar = require("./changeAvatar");

module.exports = {
  register: ctrlWrapper(register),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  editUser: ctrlWrapper(editUser),
  changeAvatar: ctrlWrapper(changeAvatar),
};
