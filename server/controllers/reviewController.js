const Review = require('../models/reviewModel');
const controllerHandler = require('../utils/controllerHandler');

const setEmployeeUserIds = (req, res, next) => {
  // Allow nested routes
  req.body.employee = req.params.employeeId;
  req.body.user = req.user.id;
  next();
};

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
};
