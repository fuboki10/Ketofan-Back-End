import { Request, Response, NextFunction } from 'express';
import status from 'http-status';
import AppError from '../utils/AppError';
import { authService } from '../services';
import { User } from '../models';

/**
 * Authentication middleware
 *
 * @version 1.0.0
 * @throws AppError 401 if no/wrong token passed
 * @author Abdelrahman Tarek
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @description takes user token to authenticate user
 * @summary User Authentication
 */
export const authenticate = async (req : Request, res : Response, next : NextFunction) => {
  // getting token and check if it is there
  const [bearer, token] = req?.headers?.authorization?.split ? req.headers.authorization.split(' ') : [undefined];

  // check if token not found
  if (!bearer || bearer !== 'Bearer' || !token) return next(new AppError('Please log in.', status.UNAUTHORIZED));

  // verification token
  const payload = await authService.verifyAuthToken(token);

  const { id } = payload;
  const user = await User.findById(id);

  if (!user || !user[0]) return next(new AppError('User Not Found', status.UNAUTHORIZED));

  // eslint-disable-next-line prefer-destructuring
  req.user = user[0];

  return next();
};

/**
 * @version 1.0.0
 * @throws AppError 403 if user doesn`t have permission
 * @author Abdelrahman Tarek
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @param {Array<String>} roles authorized roles
 * @description give permission to users based on roles
 * @summary User Authorization
 */
// eslint-disable-next-line max-len
export const authorize = (roles : Array<string>) => (req : Request, res : Response, next : NextFunction) => {
  if (!roles.includes(req.user.role)) {
    return next(
      new AppError('You do not have permission to perform this action.', 403),
    );
  }
  return next();
};
