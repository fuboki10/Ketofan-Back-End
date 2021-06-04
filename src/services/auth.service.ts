import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import status from 'http-status';
import knex from '../../db';
import {
  User, CreateUserProps, UserInterface,
} from '../models';
import AppError from '../utils/AppError';
import hashPassword from './helpers/hashPassword';
// eslint-disable-next-line import/order
import config = require('config');

interface PayloadInterface {
  id: string;
  role: string;
  verified: boolean;
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
export const generateAuthToken = async (payload : PayloadInterface) => {
  const expTime : string = process.env.JWT_EXPIRES_IN || config.get('JWT_EXPIRES_IN');
  const privateKey : string = process.env.JWT_KEY || config.get('JWT_KEY');

  const jwtString = jwt.sign(payload, privateKey, { expiresIn: expTime });

  return jwtString;
};

export const verifyAuthToken = async (token : string) : Promise<PayloadInterface> => {
  const payload = new Promise<any>((resolve, reject) => {
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
 * Create user
 * @function
 * @public
 * @async
 * @summary Create user
 * @author Abdelrahman Tarek
 * @param {Object} userProps
 * @returns
 */
export const create = async (userProps : CreateUserProps) : Promise<UserInterface> => {
  const hashedPassword : String = await hashPassword(userProps.password);

  return knex.transaction(async (trx) => {
    const user : UserInterface[] = await trx('users').returning('*').insert({
      password: hashedPassword,
      email: userProps.email,
      name: userProps.name,
      gender: userProps.gender,
      dateOfBirth: userProps.dateOfBirth,
      role: 'patient',
    });

    await trx('patients').insert({
      userId: user[0].id,
    });

    return user[0];
  });
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
export const verifyUser = async (email : string, password : string) : Promise<UserInterface> => {
  const user : UserInterface[] | undefined = await User
    .find({ email });

  // if user is not found throw error
  if (!user || !user[0] || !('password' in user[0]) || !user[0].password) {
    throw new AppError('User is not found', status.UNAUTHORIZED);
  }

  // check if input password match user password
  const passwordMatch = await checkPassword(password, user[0].password);

  // if not match throw error
  if (!passwordMatch) throw new AppError('Wrong Password', status.UNAUTHORIZED);

  // update lastLogin
  user[0].lastLogin = new Date();
  User.findById(user[0].id).update({ lastLogin: user[0].lastLogin }).then();

  return user[0];
};

const userService = {
  generateAuthToken,
  verifyAuthToken,
  hashPassword,
  create,
  verifyUser,
};

export default userService;
