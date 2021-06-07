import status from 'http-status';
import { User, CreateUserProps, UserInterface } from '../models';
import AppError from '../utils/AppError';

export const edit = async (id : number, userProps : CreateUserProps) : Promise<UserInterface> => {
  const user : UserInterface[] = await User.db
    .returning('*')
    .where({ id })
    .update(userProps);

  if (!user || !user[0]) throw new AppError('User is not found', status.NOT_FOUND);

  return user[0];
};

const userService = {
  edit,
};

export default userService;
