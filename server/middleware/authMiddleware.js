const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const asyncHandler = require('../utils/asyncHandler');

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  const bearerToken = req.headers.authorization;
  const cookieToken = req.cookies.jwt;

  if (bearerToken) token = bearerToken.split(' ')[1];
  if (cookieToken) token = cookieToken;

  if (!token)
    return next(new ErrorHandler('Authorization Token Required', 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next(
      new ErrorHandler(
        'The user belonging to this token does no longer exist',
        401
      )
    );

  req.user = currentUser;
  next();
});

module.exports = authMiddleware;
