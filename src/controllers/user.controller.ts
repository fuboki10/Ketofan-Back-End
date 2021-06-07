import { Request, Response } from 'express';
import { sendUser } from './helpers/sendUser';
import { userService } from '../services';

export const me = async (req : Request, res : Response) => {
  const { user } = req;

  return sendUser(user, res);
};

export const edit = async (req : Request, res : Response) => {
  const user = await userService.edit(req.user.id, req.body);

  return sendUser(user, res);
};

const userController = {
  me,
  edit,
};

export default userController;
