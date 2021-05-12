import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import status from 'http-status';
import { User, CreateUserProps, UserInterface } from '../models';
import AppError from '../utils/AppError';
// eslint-disable-next-line import/order
import config = require('config');

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
export const createUser = async (userProps : CreateUserProps) : Promise<UserInterface> => {
  const hashedPassword : String = await hashPassword(userProps.password);

  const user : UserInterface[] = await User.db
    .returning(['id', 'username'])
    .insert({
      username: userProps.username,
      password: hashedPassword,
    });

  return user[0];
};

export const verifyUser = async (
  userProps : {username:string}, password : string,
) : Promise<UserInterface> => {
  const user : UserInterface | undefined = await User.findOne(userProps);

  if (!user || !user.password) {
    throw new AppError('User is not found', status.NOT_FOUND);
  }

  await bcrypt.compare(password, user.password);

  return user;
};

const userService = {
  createUser,
  hashPassword,
  generateAuthToken,
  verifyUser,
};

export default userService;
