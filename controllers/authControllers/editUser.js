const path = require("path");
const fs = require("fs/promises");
const cloudinary = require("cloudinary").v2;

const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const avatarDir = path.join(__dirname, "../", "../", "temp");

const editUser = async (req, res) => {
  const { _id } = req.user;

  let avatarURL = req.user.avatarURL;

  if (req.files.length > 0) {
    const { path: tempUpload, originalname } = req.files[0];
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarDir, filename);

    await fs.rename(tempUpload, resultUpload);

    await cloudinary.uploader.upload(
      resultUpload,
      {
        public_id: filename,
        asset_folder: "users",
        resource_type: "image",
      },
      function (error, result) {
        if (error) {
          throw HttpError(500, `Error:${error}. Please try again later`);
        }
        avatarURL = result.url;
      }
    );
    await fs.unlink(resultUpload);
  }

  const { username, email, phone, skype, birthday } = req.body;

  await User.findByIdAndUpdate(_id, {
    username,
    email,
    phone,
    skype,
    birthday,
    avatarURL,
  });

  res.json({
    username,
    email,
    phone,
    skype,
    birthday,
    avatarURL,
  });
};

module.exports = editUser;
