import { Request, Response } from 'express';
import status from 'http-status';
import _ from 'lodash';
import { authService } from '../services';
import { UserInterface } from '../models';

const createTokenAndSend = async (user : UserInterface, res: Response) => {
  const token = await authService.generateAuthToken(user.id);

  res.status(status.OK).json({
    status: status.OK,
    token,
    data: {
      user: _.omit(user, ['password']),
    },
  });
};

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
  const { username, password } = req.body;

  const user = await authService.createUser({ username, password });

  createTokenAndSend(user, res);
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
  const { username, password } = req.body;

  const user = await authService.verifyUser({ username }, password);

  createTokenAndSend(user, res);
};

const authController = {
  signup,
  signin,
};

export default authController;
