const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await User.signup(name, email, password, role);
  user.password = undefined;

  res.status(201).json(user);
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

const getUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) throw Error('No such user');

  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!user) throw Error('No such user');

  res.status(200).json(user);
});

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findByIdAndDelete(id);
  if (!user) throw Error('No such user');
  res.status(200).json({ message: 'Delete Successfully' });
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
