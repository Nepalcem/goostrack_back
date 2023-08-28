const ctrlWrapper = require("../../helpers/ctrlWrapper");
const HttpError = require("../../helpers/HttpError");
const Review = require("../../models/reviewModel");

const addReview = async (req, res) => {
  const data = req.body;
  const owner = req.user?._id;

  if (!owner) {
    throw HttpError(400, "Missing owner");
  }

  if (!data) {
    throw HttpError(400, "Missing body of request");
  }

  const existReview = await Review.findOne({ owner });

  if (existReview) {
    return res.status(409).json({ message: "Review from you already exists" });
  }

  const result = await Review.create({ ...data, owner });

  if (!result) {
    throw HttpError(500, "Failed to create a review");
  }

  const review = {
    _id: result._id,
    rating: result.rating,
    comment: result.comment,
    createdAt: result.createdAt,
  };

  res.status(201).json({
    message: "Review successfully added",
    review
  });
};

module.exports = ctrlWrapper(addReview);
