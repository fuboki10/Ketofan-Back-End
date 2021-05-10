import { User } from '../models';

export const createUser = async (props : Object) => {
  const user = await User.db
    .insert(props)
    .returning(['id', 'username', 'password']);

  console.log(typeof (user));
  return user;
};

const userService = {
  createUser,
};

export default userService;
