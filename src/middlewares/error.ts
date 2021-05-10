import status from 'http-status';
import config from 'config';
import {
  Request, Response, NextFunction,
} from 'express';
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
 * @author Abdelrahman Tarek
 * @summary Convert Error to AppError
 */
const errorConverter = (err : any, req : Request, res : Response, next : NextFunction) => {
  let error = err;

  if (error.code === '23505') error = handleDuplicateKeyViolationDB(error);

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
const errorHandler = (err : any, req : Request, res : Response, next : NextFunction) => {
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
