import { Request, Response, Express } from 'express';
import { createTokenAndSend } from './helpers/sendUser';
import { userService, imageService } from '../services';
import AppError from '../utils/AppError';

export const me = async (req : Request, res : Response) => {
  const { user } = req;

  return createTokenAndSend(user, res);
};

export const edit = async (req : Request, res : Response) => {
  const { id } = req.user;

  const user = await userService.edit(id, req.body);

  return createTokenAndSend(user, res);
};

export const editProfileImage = async (req : Request, res : Response) => {
  const { id } = req.user;

  if (!req.files || !req.files.profileImage) throw new AppError('Please send a valid file', 400);

  const file : Express.Multer.File = req.files.profileImage[0];

  const profileImage = await imageService.add(file);

  const user = await userService.editProfileImage(id, profileImage);

  return createTokenAndSend(user, res);
};

export const editPassword = async (req : Request, res : Response) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;

  const user = await userService.editPassword(id, oldPassword, newPassword);

  return createTokenAndSend(user, res);
};

const userController = {
  me,
  edit,
  editProfileImage,
  editPassword,
};

export default userController;
