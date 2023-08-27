const Review = require("../models/reviewModel");
const { HttpError } = require("../helpers/HttpError");

async function update(id, data) {
  const review = await Review
    .findByIdAndUpdate(id, data, {
      new: true,
      select: "-createdAt -updatedAt -__v",
    })
    .populate("owner", "name avatarUrl");

  if (!review) {
    throw HttpError(400, "Unable to find Review");
  }

  return review;
}

async function removeReview(id) {
  const review = await Review.findByIdAndDelete(id, {
    select: "-createdAt -updatedAt -__v",
  });

  if (!review) {
    throw HttpError(400, "Unable to find Review");
  }

  return review;
}

module.exports = {
  update,
  removeReview,
};