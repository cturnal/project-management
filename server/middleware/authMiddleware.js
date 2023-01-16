const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const asyncHandler = require('../utils/asyncHandler');

const authHandler = asyncHandler(async (req, res, next) => {
  let token;
  const bearerToken = req.headers.authorization;
  const cookieToken = req.cookies.jwt;

  if (bearerToken) token = bearerToken.split(' ')[1];
  if (cookieToken) token = cookieToken;

  if (!token) {
    res.status(401);
    throw Error('Authorization Token Required');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    res.status(401);
    throw Error('The user belonging to this token does no longer exist');
  }
  req.user = currentUser;
  next();
});

module.exports = authHandler;
