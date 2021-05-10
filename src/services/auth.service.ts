import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models';
// eslint-disable-next-line import/order
import config = require('config');

interface UserProps {
  username: string;
  password: string;
}

/**
 * Generate Authentication token
 *
 * @function
 * @public
 * @async
 * @author Abdelrahman Tarek
 * @summary Generate Authentication token
 * @param {String} userId User ID
 * @returns {String} `token` authentication token
 */
export const generateAuthToken = async (userId : string) => {
  const expTime : string = process.env.JWT_EXPIRES_IN || config.get('JWT_EXPIRES_IN');
  const privateKey : string = process.env.JWT_KEY || config.get('JWT_KEY');

  const jwtString = jwt.sign(
    { id: userId },
    privateKey,
    { expiresIn: expTime },
  );

  return jwtString;
};
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
    .returning(['id', 'username']);

  return user[0];
};

const userService = {
  createUser,
  hashPassword,
  generateAuthToken,
};

export default userService;
