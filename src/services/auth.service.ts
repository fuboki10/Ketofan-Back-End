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

export const verifyAuthToken = async (token : string) : Promise<Object> => {
  const payload = new Promise<Object>((resolve, reject) => {
    jwt.verify(token, config.get('JWT_KEY'), (err, result) => {
      if (err || !result) return reject(new AppError('Invalid Token', status.BAD_REQUEST));
      return resolve(result);
    });
  });

  return payload;
};

/**
 * Check if password is correct
 *
 * @function
 * @public
 * @async
 * @author Abdelrahman Tarek
 * @param {String} password
 * @param {String} hashedPassword
 * @summary Check if password is correct
 * @returns {Boolean} `isPasswordMatch` is `true` the password is correct
 */
const checkPassword = async (password : string, hashedPassword : string) : Promise<boolean> => {
  const isPasswordMatch : boolean = await bcrypt.compare(password, hashedPassword);
  return isPasswordMatch;
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
    .not.returning('password')
    .insert({
      username: userProps.username,
      password: hashedPassword,
    });

  return user[0];
};

/**
 * verify user login
 * @function
 * @async
 * @public
 * @author Abdelrahman Tarek
 * @param userProps {object{ username: string }
 * @param password
 * @returns
 */
export const verifyUser = async (
  userProps : {username:string}, password : string,
) : Promise<UserInterface> => {
  const user : UserInterface[] | undefined = await User.find(userProps);

  // if user is not found throw error
  if (!user || !user[0] || !('password' in user[0]) || !user[0].password) {
    throw new AppError('User is not found', status.UNAUTHORIZED);
  }

  // check if input password match user password
  const passwordMatch = await checkPassword(password, user[0].password);

  // if not match throw error
  if (!passwordMatch) throw new AppError('Wrong Password', status.UNAUTHORIZED);

  return user[0];
};

const userService = {
  generateAuthToken,
  verifyAuthToken,
  hashPassword,
  createUser,
  verifyUser,
};

export default userService;
