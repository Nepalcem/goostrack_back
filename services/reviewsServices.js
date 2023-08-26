const Review = require("../models/reviewModel");
const { HttpError } = require("../helpers/HttpError");

async function showAllReviews(pagination) {
  const reviews = await Review.aggregate([
    { $group: { _id: "$owner", createdAt: { $last: "$$ROOT" } } },
    { $replaceRoot: { newRoot: "$createdAt" } },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    { $unwind: "$owner" },
    {
      $project: {
        _id: 1,
        rating: 1,
        comment: 1,
        createdAt: 1,
        owner: { name: 1, avatarUrl: 1 },
      },
    },
    { $sort: { createdAt: -1 } },
    { $skip: pagination.skip },
    { $limit: Number(pagination.limit) },
  ]);

  if (!reviews) {
    throw HttpError(400, "Unable to fetch Review");
  }

  return reviews;
}

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


async function addReview(owner, data) {
  const review = await Review.create({ ...data, owner });

  if (!review) {
    throw HttpError(400, "Unable to save Review in DataBase");
  }

  return showReviewById(review._id);
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
  showAllReviews,
  showReviewsByOwner,
  showReviewById,
  addReview,
  update,
  removeReview,
};