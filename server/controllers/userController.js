const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');

// get jwt token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 3600 });
};

// send jwt token to a cookie
const cookieToken = (user, statusCode, req, res) => {
  const token = createToken(user._id);
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 100 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  user.password = undefined;
  res.status(statusCode).json({
    token,
    user,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.login(email, password);
  cookieToken(user, 200, req, res);
};

const signupUser = asyncHandler(async (req, res) => {
  const { name, email, password, photo, role } = req.body;
  const user = await User.signup(name, email, password, role);
  cookieToken(user, 201, req, res);
});

const logoutUser = async (req, res) => {
  res.json({ msg: 'logout user route' });
};

const getUsers = async (req, res) => {
  res.json({ msg: 'get users route' });
};

const createUser = async (req, res) => {
  res.json({ msg: 'create user route' });
};

const getUser = async (req, res) => {
  res.json({ msg: 'get user route' });
};

const updateUser = async (req, res) => {
  res.json({ msg: 'update user route' });
};

const deleteUser = async (req, res) => {
  res.json({ msg: 'delete users route' });
};

module.exports = {
  loginUser,
  signupUser,
  logoutUser,
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
