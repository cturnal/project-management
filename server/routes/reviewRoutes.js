const express = require('express');

const router = express.Router({ mergeParams: true });

const authHandler = require('../middleware/authMiddleware');

const {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
  setEmployeeUserIds,
} = require('../controllers/reviewController');

router.use(authHandler);

router.route('/').get(getReviews).post(setEmployeeUserIds, createReview);
router.route('/:id').get(getReview).patch(updateReview).delete(deleteReview);

module.exports = router;
