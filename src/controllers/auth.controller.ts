import { Request, Response } from 'express';
import { authService, verifyService } from '../services';
import { createTokenAndSend } from './helpers/sendUser';

export const signup = async (req : Request, res : Response) => {
  const user = await authService.create(req.body);

  verifyService.createVerifyTokenAndSendEmail(user);

  return createTokenAndSend(user, res);
};

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
