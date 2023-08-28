const { Router } = require('express');
const ctrl = require('../../controllers/reviewsController');
const authenticate = require("../../middleWares/authenticate");
const reviewSchema = require("../../joiSchemas/reviewSchema");
const { validateBody } = require("../../middleWares");

const router = Router();

router.get('/', ctrl.getAllReviews);

router.get('/own', authenticate, ctrl.getReviewByUser);

router.post('/own', authenticate, validateBody(reviewSchema), ctrl.addReview);

router.patch('/own', authenticate, validateBody(reviewSchema), ctrl.updateReview);

router.delete('/own',authenticate, ctrl.removeReview);

module.exports = router;