import { Request, Response } from 'express';
import status from 'http-status';
import { authService } from '../services';
import { UserInterface } from '../models';

const createTokenAndSend = async (user : UserInterface, res: Response) => {
  const token = await authService.generateAuthToken(user.id);

  res.status(status.OK).json({
    status: status.OK,
    token,
    data: {
      user,
    },
  });
};

export const signup = async (req : Request, res : Response) => {
  const { username, password } = req.body;

  const user = await authService.createUser({ username, password });

  createTokenAndSend(user, res);
};

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
