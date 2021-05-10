import bcrypt from 'bcryptjs';
import { User } from '../models';

interface UserProps {
  username: string;
  password: string;
}

/**
 * Hash Password
 *
 * @function
 * @public
 * @author Abdelrahman Tarek
 * @param {String} Password Password to be hashed
 * @summary Hash Password
 * @returns {String} `hashedPassword`
 */
export const hashPassword = async (password : string) : Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

/**
 * Create user
 * @function
 * @public
 * @async
 * @summary Create user
 * @author Abdelrahman Tarek
 * @param {Object} userProps
 * @returns
 */
export const createUser = async (userProps : UserProps) => {
  const hashedPassword = await hashPassword(userProps.password);

  const user = await User.db
    .insert({
      username: userProps.username,
      password: hashedPassword,
    })
    .returning(['id', 'username', 'password']);

  return user;
};

const userService = {
  createUser,
  hashPassword,
};

export default userService;
