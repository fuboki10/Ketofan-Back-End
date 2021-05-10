import { Request, Response } from 'express';
import status from 'http-status';
import { authService } from '../services';

export const signup = async (req : Request, res : Response) => {
  const user = await authService.createUser(req.body);

  res.status(status.OK).json({
    status: status.OK,
    data: {
      user,
    },
  });
};

const authController = {
  signup,
};

export default authController;
