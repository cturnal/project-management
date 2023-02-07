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
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
      });
    }

    console.error('ERROR 💥', err);
    return res.status(500).json({
      message: 'Something went very wrong!',
    });
  }
};

module.exports = errorMiddleware;
