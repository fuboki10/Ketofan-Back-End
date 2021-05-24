import { Request, Response } from 'express';
import { authService, verifyService } from '../services';
import { createTokenAndSend } from './helpers/sendUser';

/**
 * Signup
 *
 * @function
 * @async
 * @public
 * @version 1.0.0
 * @author Abdelrahman Tarek
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @description Signup
 * @summary Signup
 */
export const signup = async (req : Request, res : Response) => {
  const user = await authService.createUser(req.body);

  verifyService.createVerifyTokenAndSendEmail(user);

  return createTokenAndSend(user, res);
};

/**
 * Signin
 *
 * @function
 * @async
 * @public
 * @version 1.0.0
 * @throws AppError 401/404
 * @author Abdelrahman Tarek
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @description Signin
 * @summary Signin
 */
export const signin = async (req : Request, res : Response) => {
  const { email, password } = req.body;

  const user = await authService.verifyUser(email, password);

  return createTokenAndSend(user, res);
};

const authController = {
  signup,
  signin,
};

export default authController;
