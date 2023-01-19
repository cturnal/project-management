const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  if (process.env.NODE_ENV === 'production') {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
      });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2) Send generic message
    return res.status(500).json({
      message: 'Something went very wrong!',
    });
  }
};

module.exports = errorMiddleware;
