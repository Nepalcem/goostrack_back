const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { HttpError } = require("../../helpers");
const Review = require("../../models/reviewModel");

const updateReview = async (req, res) => {
  const owner = req.user?._id;

  if (!owner) {
    throw HttpError(400, 'Missing owner');
  }

  if (!req.body) {
    throw HttpError(400, 'Missing body of request');
  }

  const review = await Review.findOneAndUpdate({ owner }, req.body, { new: true });

  if (!review) {
    throw HttpError(404, 'Review not found for update');
  }

  res.json({
    message: 'Review successfully update',
    review,
  });
  };

  module.exports = ctrlWrapper(updateReview);
