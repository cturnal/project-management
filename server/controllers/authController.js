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

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler('All fields must be filled', 400));

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.checkPassword(password, user.password)))
    return next(new ErrorHandler('Invalid Credentials', 400));

  createSendToken(user, 200, req, res);
});

const signupUser = asyncHandler(async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;
  const user = await User.create({ name, email, password, passwordConfirm });
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

const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  if (!(await user.checkPassword(req.body.password, user.password))) {
    return next(new ErrorHandler('Your current password is wrong.', 401));
  }
  if (await user.checkPassword(req.body.newPassword, user.password))
    return next(new ErrorHandler('Please Change your password', 401));

  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  createSendToken(user, 201, req, res);
});

module.exports = {
  loginUser,
  signupUser,
  logoutUser,
  restrictUser,
  updatePassword,
};
