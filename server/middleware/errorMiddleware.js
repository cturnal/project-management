const ErrorHandler = require('../utils/errorHandler');

// handled errors
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new ErrorHandler(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new ErrorHandler(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new ErrorHandler(message, 400);
};

const handleJWTError = () =>
  new ErrorHandler('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new ErrorHandler('Your token has expired! Please log in again.', 401);

// catching all errors
const errorMiddleware = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;

  // handled errors
  if (error.name === 'CastError') error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
  if (error.name === 'JsonWebTokenError') error = handleJWTError();
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

  // send this if in development mode
  if (process.env.NODE_ENV === 'development') {
    return res.status(error.statusCode).json({
      error: error,
      message: error.message,
      stack: error.stack,
    });
  }

  // send this if in production mode
  if (process.env.NODE_ENV === 'production') {
    if (error.isOperational) {
      return res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
      });
    }

    // send this if error is unhandled
    console.error('ERROR 💥', err);
    return res.status(500).json({
      message: 'Something went very wrong!',
    });
  }
};

module.exports = errorMiddleware;
