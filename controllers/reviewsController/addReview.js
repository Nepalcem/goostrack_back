const ctrlWrapper = require("../../helpers/ctrlWrapper");
const HttpError = require("../../helpers/HttpError");
const Review = require("../../models/reviewModel");

const addReview = async (req, res) => {
  const body = req.body;
  const owner = req.user?._id;

  console.log(body)

  if (!owner) {
    throw HttpError(400, "Missing owner");
  }

  if (!body) {
    throw HttpError(400, "Missing body of request");
  }

  const existReview = await Review.findOne({ owner });

  if (existReview) {
    return res.status(409).json({ message: "Review from you already exists" });
  }

  const review = await Review.create({ ...body, owner });

  if (!review) {
    throw HttpError(500, "Failed to create a review");
  }

  await review.populate("owner", "_id avatarURL").execPopulate();

  res.status(201).json({
    message: "Review added successfully",
    data: review,
  });
};

module.exports = ctrlWrapper(addReview);
