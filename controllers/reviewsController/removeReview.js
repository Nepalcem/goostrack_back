const Review = require("../../models/reviewModel");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { HttpError } = require("../../helpers");

const removeReview = async (req, res) => {
  const owner = req.user?._id;

  if (!owner) {
    throw HttpError(400, "Missing owner");
  }

  const review = await Review.findOneAndRemove({ owner });

  if (!review) {
    throw HttpError(404, "Review not found for delete");
  }

  res.json({
    message: "Review deleted successfully",
  });
};

module.exports = ctrlWrapper(removeReview);
