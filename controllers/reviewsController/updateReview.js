const { HttpError, ctrlWrapper } = require("../../helpers");
const Review = require("../../models/reviewModel");

const updateReview = async (req, res) => {
  const owner = req.user?._id;

  if (!owner) {
    throw HttpError(400, "Missing owner");
  }

  const existingReview = await Review.findOne({ owner });

  if (!existingReview) {
    throw HttpError(404, "Review not found for update");
  }

  const updatedFields = req.body;
  let isUpdateRequired = false;

  if (
    "rating" in updatedFields &&
    existingReview.rating !== updatedFields.rating
  ) {
    isUpdateRequired = true;
  }

  if (
    "comment" in updatedFields &&
    existingReview.comment !== updatedFields.comment
  ) {
    isUpdateRequired = true;
  }

  if (!isUpdateRequired) {
    throw HttpError(404, "Nothing for update");
  }

  const updatedReview = await Review.findOneAndUpdate(
    { owner },
    updatedFields,
    { new: true }
  );

  if (!updatedReview) {
    throw HttpError(500, "Failed to update the review");
  }

  res.json({
    message: "Review successfully updated",
    review: updatedReview,
  });
};

module.exports = ctrlWrapper(updateReview);
