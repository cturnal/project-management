const Review = require('../models/reviewModel');
const controllerHandler = require('../utils/controllerHandler');
const ErrorHandler = require('../utils/errorHandler');

// Allow nested routes
const setEmployeeUserIds = (req, res, next) => {
  if (req.user.id === req.params.employeeId)
    return next(new ErrorHandler('You cant review yourself', 400));
  if (!req.body.employee) req.body.employee = req.params.employeeId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

// check if  user is authorized to update
const authorizedUser = async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  console.log(review.user._id.toString(), req.user.id);
  if (review.user._id.toString() !== req.user.id)
    return next(new ErrorHandler('Not Authorized', 403));

  next();
};

// CRUD features for review
const createReview = controllerHandler.createOne(Review);
const getReviews = controllerHandler.getAll(Review);
const getReview = controllerHandler.getOne(Review);
const updateReview = controllerHandler.updateOne(Review);
const deleteReview = controllerHandler.deleteOne(Review);

module.exports = {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
  setEmployeeUserIds,
  authorizedUser,
};
