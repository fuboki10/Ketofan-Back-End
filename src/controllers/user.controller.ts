import { Request, Response, Express } from 'express';
import { sendUser } from './helpers/sendUser';
import { userService, imageService } from '../services';
import AppError from '../utils/AppError';

export const me = async (req : Request, res : Response) => {
  const { user } = req;

  return sendUser(user, res);
};

export const edit = async (req : Request, res : Response) => {
  const user = await userService.edit(req.user.id, req.body);

  return sendUser(user, res);
};

export const editProfileImage = async (req : Request, res : Response) => {
  if (!req.files.profileImage) throw new AppError('Please send a valid file', 400);

  const file : Express.Multer.File = req.files.profileImage[0];

  const profileImage = await imageService.add(file);

  const user = await userService.editProfileImage(req.user.id, profileImage);

  return sendUser(user, res);
};

const userController = {
  me,
  edit,
  editProfileImage,
};

export default userController;
