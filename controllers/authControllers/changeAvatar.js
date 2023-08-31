const path = require("path");
const fs = require("fs/promises");
const cloudinary = require("cloudinary").v2;

const { User } = require("../../models");
const HttpError = require("../../helpers");

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const avatarDir = path.join(__dirname, "../", "../", "temp");

const changeAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(404, "Image not found");
  }
  if (req.file.fieldname !== "avatar") {
    throw HttpError(400, "fieldname must be 'avatar'");
  }
  if (req.file.mimetype !== "image/jpeg") {
    throw HttpError(400, "file type must be jpg");
  }
  // console.log(req.file);
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);

  await fs.rename(tempUpload, resultUpload);

  let avatarURL = "";

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

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = changeAvatar;
