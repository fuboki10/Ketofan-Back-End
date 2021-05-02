const status = require('http-status');
const config = require('config');
const AppError = require('../utils/AppError');
const logger = require('../utils/logger');

const env = process.env.NODE_ENV || config.get('NODE_ENV');

/**
 * @author Abdelrahman Tarek
 * @summary Convert Error to AppError
 */
const errorConverter = (err, req, res, next) => {
  let error = err;

  // create AppError object if it's not an operational error
  if (!(error instanceof AppError)) {
    const statusCode = error.statusCode || status.INTERNAL_SERVER_ERROR;
    const message = error.message || status[statusCode];
    error = new AppError(message, statusCode, false, err.stack);
  }

  next(error);
};

/**
 * @author Abdelrahman Tarek
 * @summary Handle Errors
 */
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  // if production and not operational consider it be internal server error
  if (env === 'production' && !err.isOperational) {
    statusCode = status.INTERNAL_SERVER_ERROR;
    message = status[status.INTERNAL_SERVER_ERROR];
  }

  // add err.message to respones locals to use it in logging
  res.locals.errorMessage = err.message;

  // create respones object
  const response = {
    status: statusCode,
    errors: [{ message }],
  };

  // if development print error to console
  if (env === 'development') {
    logger.error(err);
  }

  // send error response
  res.status(statusCode).json(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
