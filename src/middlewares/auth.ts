import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';
import { authService } from '../services';

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
  if (!bearer || bearer !== 'Bearer' || !token) return next(new AppError('Please log in.', 401));

  // verification token
  await authService.verifyAuthToken(token);

  return next();
};
