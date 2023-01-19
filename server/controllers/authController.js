const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');
const ErrorHandler = require('../utils/errorHandler');

// get jwt token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// send jwt token to a cookie
const createSendToken = (user, statusCode, req, res) => {
  const token = createToken(user._id);
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  user.password = undefined;
  res.status(statusCode).json({
    token,
    user,
  });
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.login(email, password);
  createSendToken(user, 200, req, res);
});

const signupUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, photo } = req.body;
  const user = await User.signup(name, email, password, photo);
  createSendToken(user, 201, req, res);
});

const logoutUser = (req, res) => {
  res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ message: 'logout successfully' });
};

const restrictUser = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(
        new ErrorHandler(
          'You do not have permission to perform this action',
          403
        )
      );
    }
    next();
  };
};

module.exports = {
  loginUser,
  signupUser,
  logoutUser,
  restrictUser,
};