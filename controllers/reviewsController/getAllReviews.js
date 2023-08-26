const Review = require('../../models/reviewModel');
const ctrlWrapper = require('../../helpers/ctrlWrapper');
const HttpError = require('../../helpers/HttpError');

const pagination = require('../../utils/pagination');

const getAll = async (req, res) => {
  const { page: currentPage, limit: currentLimit } = req.query;

  const { page, limit, skip } = pagination(currentPage, currentLimit);

  // Отримуємо всі відгуки for test on local DB
  const reviews = await Review.find({}, '', { skip, limit })
    .populate('owner', '_id name avatarUrl')
    .sort('-createdAt');

  const reviewsCollection = await Review.aggregate([
    { $match: { owner: { $exists: true, $ne: null } } },
    { $lookup: { from: 'user', localField: 'owner', foreignField: '_id', as: 'owner' } },
    { $unwind: '$owner' },
    {
      $project: {
        _id: 1,
        rating: 1,
        comment: 1,
        createdAt: 1,
        updatedAt: 1,
        owner: { _id: 1, name: 1, avatarUrl: 1 },
      },
    },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
  ]);

  if (!reviewsCollection) {
    throw HttpError(404, 'Not found reviews');
  }

  const totalReviews = await Review.countDocuments();

  res.status(200).json({
    code:200,
    totalReviews,
    totalPages: Math.ceil(totalReviews / limit),
    currentPage: page,
    limit,
    // reviewsCollection
    reviews
  });
};

module.exports = ctrlWrapper(getAll);