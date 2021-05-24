import { Request, Response } from 'express';
import status from 'http-status';
import _ from 'lodash';
import { authService, mailService } from '../services';
import { UserInterface } from '../models';
import logger from '../utils/logger';

const createTokenAndSend = async (user : UserInterface, res: Response) => {
  const payload = {
    id: user.id,
    role: user.role,
  };

  const token = await authService.generateAuthToken(payload);

  const response = {
    status: status.OK,
    token,
    data: {
      user: _.omit(user, ['password']),
    },
  };

  return res.status(status.OK).json(response);
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
  const user = await authService.createUser(req.body);

  const message = `Hello ${user.name}<br>
  You are almost done<br>Confirm your account below to finish creating your Ketofan account`;

  const mailOptions = {
    email: user.email,
    subject: 'Verify your account',
    message,
    button: 'CONFIRM ACCOUNT',
    link: `${req.get('host')}/verify/`,
  };

  mailService.sendEmail(mailOptions)
    .then(() => logger.info(`Sent Mail to ${user.email}`))
    .catch((error) => {
      const { code, response } = error;
      logger.error(`${code} : ${response.body.errors[0].message}`);
    });

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
