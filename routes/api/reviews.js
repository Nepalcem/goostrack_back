const { Router } = require('express');
const ctrl = require('../../controllers/reviewsController');

const router = Router();

// returns all feedback: GET http://localhost:8000/api/reviews
router.get('/', ctrl.getAllReviews);

module.exports = router;