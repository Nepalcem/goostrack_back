const { reviewsServices } = require("../services");
const ctrlWrapper = require('../../helpers/ctrlWrapper');

// Змінити відгук за ID
const updateReview = async (req, res) => {
    const { id } = req.params;
    const review = await reviewsServices.update(id, { ...req.body });
    res.status(200).json({ code: 200, data: review });
  };

  module.exports = {
    updateReview: ctrlWrapper(updateReview),
};