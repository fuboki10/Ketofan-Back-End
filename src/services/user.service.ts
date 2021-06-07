import status from 'http-status';
import { User, CreateUserProps, UserInterface } from '../models';
import AppError from '../utils/AppError';
import imageService from './image.service';
import checkPassword from './helpers/checkPassword';
import hashPassword from './helpers/hashPassword';

export const edit = async (id : number, userProps : CreateUserProps) : Promise<UserInterface> => {
  const user : UserInterface[] = await User.db
    .returning('*')
    .where({ id })
    .update(userProps);

  if (!user || !user[0]) throw new AppError('User is not found', status.NOT_FOUND);

  return user[0];
};

export const editProfileImage = async (id : number, profileImage : number)
: Promise<UserInterface> => {
  const oldUser : UserInterface[] = await User.db
    .returning('*')
    .where({ id });

  const user : UserInterface[] = await User.db
    .returning('*')
    .where({ id })
    .update({ profileImage });

  if (!user || !user[0]) throw new AppError('User is not found', status.NOT_FOUND);

  if (oldUser && oldUser[0] && oldUser[0].profileImage) {
    // delete old image
    await imageService.remove(oldUser[0].profileImage);
  }

  return user[0];
};

export const editPassword = async (id : number, oldPassword : string, newPassword : string)
: Promise<UserInterface> => {
  let user : UserInterface[] = await User.db
    .returning('*')
    .where({ id });

  if (!user || !user[0] || !user[0].password) throw new AppError('User is not found', status.NOT_FOUND);

  if (!checkPassword(oldPassword, user[0].password)) throw new AppError('Password is not correct', status.BAD_REQUEST);

  const hashedPassword = hashPassword(newPassword);

  user = await User.db
    .returning('*')
    .where({ id })
    .update({ password: hashedPassword });

  return user[0];
};

const userService = {
  edit,
  editProfileImage,
  editPassword,
};

export default userService;
