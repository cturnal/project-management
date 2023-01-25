const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');
const controllerHandler = require('../utils/controllerHandler');
const ErrorHandler = require('../utils/errorHandler');

const getMyProfile = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  req.params.id = req.user.id;

  if (req.user.role !== 'admin') {
    req.body = {
      name,
      email,
    };
  }
  next();
};

const createUser = controllerHandler.createOne(User);
const getUsers = controllerHandler.getAll(User);
const getUser = controllerHandler.getOne(User);
const updateUser = controllerHandler.updateOne(User);
const deleteUser = controllerHandler.deleteOne(User);

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateProfile,
};
