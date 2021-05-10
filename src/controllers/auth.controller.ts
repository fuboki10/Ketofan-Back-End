import { Request, Response } from 'express';
import status from 'http-status';
import { userService } from '../services';

export const signup = async (req : Request, res : Response) => {
  const user = await userService.createUser(req.body);

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
