const getCurrentUser = async (req, res) => {
  const { username, email, avatarURL, phone, skype, birthday } = req.user;
  res.json({
    username,
    email,
    phone,
    skype,
    birthday,
    avatarURL,
  });
};

module.exports = getCurrentUser;
