/* eslint-disable max-len */
import status from 'http-status';
import config from 'config';
import {
  Request, Response, NextFunction,
} from 'express';
import multer from 'multer';
import AppError from '../utils/AppError';
import logger from '../utils/logger';

const env = process.env.NODE_ENV || config.get('NODE_ENV');

/**
 * handle duplicate key violation in PostgreSQL
 * @author Abdelrahman Tarek
 * @param error
 * @returns AppError
 */
function handleDuplicateKeyViolationDB(error : any) : AppError {
  return new AppError(error.detail, status.BAD_REQUEST);
}

/**
 * Handle ENOENT Error
 *
 * @function
 * @private
 * @author Abdelrahman Tarek
 * @param {Object} err Error object
 * @returns {Object} AppError object
 */
const handleENOENTError = () => new AppError('File Does Not exist', 404);

/**
 * Handle OAuth Error
 *
 * @function
 * @private
 * @author Abdelrahman Tarek
 * @param {Object} err Error object
 * @returns {Object} AppError object
 */
const handleOAuthError = (err : any) => new AppError(err.message, err.oauthError.statusCode ? err.oauthError.statusCode : err.oauthError);

/**
 * Handle Cast DB Error
 *
 * @function
 * @private
 * @author Abdelrahman Tarek
 * @param {Object} err Error object
 * @returns {Object} AppError object
 */
const handleCastErrorDB = (err : any) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

/**
 * Handle JWT Error
 *
 * @function
 * @private
 * @author Abdelrahman Tarek
 * @param {Object} err Error object
 * @returns {Object} AppError object
 */
const handleJWTError = () => new AppError('Invalid Token. Please log in again', 401);

/**
 * Handle JWT Expired Error
 *
 * @function
 * @private
 * @author Abdelrahman Tarek
 * @param {Object} err Error object
 * @returns {Object} AppError object
 */
const handleJWTExpiredError = () => new AppError('Your token has expired! Please log in again.', 401);

/**
 * Handle Validation Error
 *
 * @function
 * @private
 * @author Abdelrahman Tarek
 * @param {Object} err Error object
 * @returns {Object} AppError object
 */
const handleValidationErrorDB = (err : any) => {
  const errors = Object.values(err.errors).map((el : any) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleMulterError = (err : any) => new AppError(err.message, status.BAD_REQUEST);

/**
 * @author Abdelrahman Tarek
 * @summary Convert Error to AppError
 */
const errorConverter = (err : any, _req : Request, _res : Response, next : NextFunction) => {
  let error = err;

  if (error.code === '23505') error = handleDuplicateKeyViolationDB(error);
  if (error.code === 'ENOENT') error = handleENOENTError();
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
  if (error.name === 'JsonWebTokenError') error = handleJWTError();
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
  if (error.name === 'CastError') error = handleCastErrorDB(error);
  if (error.name === 'InternalOAuthError') error = handleOAuthError(error);
  if (error instanceof multer.MulterError) error = handleMulterError(error);

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
// eslint-disable-next-line no-unused-vars
const errorHandler = (err : any, _req : Request, res : Response, _next : NextFunction) => {
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

export {
  errorConverter,
  errorHandler,
};
