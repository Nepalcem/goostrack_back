const Review = require('../../models/reviewModel');
const ctrlWrapper = require('../../helpers/ctrlWrapper');

const getAll = async (req, res) => {

    const result = await Review.find();
    res.json(result)
};

module.exports = ctrlWrapper(getAll);
