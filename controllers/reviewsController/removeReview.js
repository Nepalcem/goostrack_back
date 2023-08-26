const { reviewsServices } = require("../services");
const ctrlWrapper = require('../../helpers/ctrlWrapper');

// Видалити відгук за ID
const removeReview = async (req, res) => {
    const { id } = req.params;
    const review = await reviewsServices.remove(id);
    res.status(200).json({ code: 200, data: review });
  };

  module.exports = {
    removeReview: ctrlWrapper(removeReview),
};