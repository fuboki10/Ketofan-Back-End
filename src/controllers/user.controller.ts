import { Request, Response } from 'express';
import { sendUser } from './helpers/sendUser';

export const me = async (req : Request, res : Response) => {
  const { user } = req;

  return sendUser(user, res);
};

const userController = {
  me,
};

export default userController;
