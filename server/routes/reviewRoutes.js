const express = require('express');

const router = express.Router({ mergeParams: true });

const authMiddleware = require('../middleware/authMiddleware');

const {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
  setEmployeeUserIds,
  authorizedUser,
} = require('../controllers/reviewController');

router.use(authMiddleware);

router.route('/').get(getReviews).post(setEmployeeUserIds, createReview);
router
  .route('/:id')
  .get(getReview)
  .patch(authorizedUser, updateReview)
  .delete(deleteReview);

module.exports = router;
