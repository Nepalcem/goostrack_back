const Review = require("../models/reviewModel");
const { HttpError } = require("../helpers/HttpError");

async function showReviewsByOwner(owner, pagination) {
  const reviews = await Review
    .find({ owner }, "-createdAt -updatedAt -__v", pagination)
    .populate("owner", "name avatarUrl");

  if (!reviews) {
    throw HttpError(400, "Unable to fetch Review");
  }

  return reviews;
}

async function showReviewById(id) {
  const review = await Review
    .findById(id, "-createdAt -updatedAt -__v")
    .populate("owner", "name avatarUrl");

  if (!review) {
    throw HttpError(400, "Unable to fetch Review");
  }

  return review;
}

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
  showReviewsByOwner,
  showReviewById,
  update,
  removeReview,
};