const Review = require("../../models/reviewModel");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const HttpError = require("../../helpers/HttpError");

const getReviewByUser = async (req, res) => {
  const owner = req.user?._id;

  if (!owner) {
    throw HttpError(400, "Missing owner");
  }

  const reviews = await Review.find({ owner }).populate(
    "owner",
    "-_id username avatarURL"
  );

  if (!reviews || reviews.length === 0) {
    throw HttpError(404, "No reviews found for this owner");
  }

  res.status(200).json({ reviews });
};

module.exports = ctrlWrapper(getReviewByUser);
