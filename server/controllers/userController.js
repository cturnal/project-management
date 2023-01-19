const User = require('../models/userModel');
const controllerHandler = require('../utils/controllerHandler');

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
};
