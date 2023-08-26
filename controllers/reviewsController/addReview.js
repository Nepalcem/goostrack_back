const  reviewsServices = require("../../services/reviewsServices");
// const Review = require('../../models/reviewModel');
const ctrlWrapper = require('../../helpers/ctrlWrapper');

const addReview = async (req, res) => {

// const result = await Review.create(req.body)
// res.status(201).json(result)

    const { _id: owner } = req.user;
    const review = await reviewsServices.add(owner, { ...req.body });
    res.status(201).json({ code: 201, data: review });
  };

module.exports = ctrlWrapper(addReview);
