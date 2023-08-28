const { User } = require("../../models");

const editUser = async (req, res) => {
  const { _id } = req.user;
  const { username, email, phone, skype, birthday } = req.body;
  await User.findByIdAndUpdate(_id, {
    username,
    email,
    phone,
    skype,
    birthday,
  });
  res.json({
    username,
    email,
    phone,
    skype,
    birthday,
  });
};

module.exports = editUser;
