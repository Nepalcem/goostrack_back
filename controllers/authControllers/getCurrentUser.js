const getCurrentUser = async (req, res) => {
  const { username, email, avatarURL } = req.user;
  res.json({
    username,
    email,
    avatar: avatarURL,
  });
};

module.exports = getCurrentUser;
