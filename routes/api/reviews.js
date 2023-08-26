const { Router } = require('express');
const ctrl = require('../../controllers/reviewsController');
console.log(ctrl.addReview)

const router = Router();

// returns all feedbacks: GET http://localhost:8000/api/reviews
router.get('/', ctrl.getAllReviews);

// // returns all feedbacks for its owner: GET http://localhost:8000/api/reviews/own
// router.get('/own', ctrl.getReviewByUser);

// create new feedback: POST http://localhost:8000/api/reviews/own
// body raw { "rating": 5, "comment": "A good, visual time planning program."}
router.post('/own', ctrl.addReview);

// // update review: PATCH http://localhost:8000/api/reviews/own
// // body raw { "rating": 3, "comment": "The program..."}
// router.patch('/own', ctrl.updateReview);

// // delete review: DELETE http://localhost:8000/api/reviews/own
// router.delete('/own', ctrl.removeReview);

module.exports = router;