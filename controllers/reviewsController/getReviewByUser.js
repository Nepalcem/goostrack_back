const Review = require('../../models/review');
const ctrlWrapper = require('../../decorators/ctrlWrapper');
const HttpError = require('../../helpers/HttpError');

// Отримати відгуки, які належать певному власнику
const getReviewByUser = async (req, res) => {
  // Отримуємо _id власника з об'єкта req.user (якщо він існує)
  const owner = req.user?._id;

  // Перевірка, чи є власник у запиті
  if (!owner) {
    throw HttpError(400, 'Missing owner');
  }

  // Знаходимо всі відгуки, які належать даному власнику
  const reviews = await Review.find({ owner }).populate('owner', '_id name avatarUrl');

  // Перевірка, чи були знайдені відгуки
  if (!reviews || reviews.length === 0) {
    throw HttpError(404, 'No reviews found for this owner');
  }

  // Відправляємо відповідь зі списком відгуків та даними про власника
  res.status(200).json({ code: 200, reviews });
};

module.exports = ctrlWrapper(getReviewByUser);