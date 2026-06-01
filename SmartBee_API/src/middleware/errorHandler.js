const AppError = require('../utils/AppError');
const config = require('../config');

const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal server error';

  if (config.env === 'development' && !err.isOperational) {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(config.env === 'development' && err.errors && { details: err.errors }),
  });
};

const notFound = (req, _res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

module.exports = { errorHandler, notFound };
