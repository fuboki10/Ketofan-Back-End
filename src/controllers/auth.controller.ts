import { Request, Response } from 'express';
import status from 'http-status';
import { authService } from '../services';

export const signup = async (req : Request, res : Response) => {
  const { username, password } = req.body;
  const user = await authService.createUser({ username, password });

  const token = await authService.generateAuthToken(user.id);
  res.status(status.OK).json({
    status: status.OK,
    token,
    data: {
      user,
    },
  });
};

const authController = {
  signup,
};

export default authController;
