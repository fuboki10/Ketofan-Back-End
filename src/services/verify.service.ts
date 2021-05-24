import crypto from 'crypto';
import status from 'http-status';
import { VerifyToken, User, UserInterface } from '../models';
import mailService from './mail.service';
import logger from '../utils/logger';
import AppError from '../utils/AppError';

const createVerifyToken = async (user: UserInterface) : Promise<string> => {
  const token = crypto.randomBytes(48).toString('hex');

  await VerifyToken.db
    .insert({
      userId: user.id,
      token,
    });

  return token;
};

const sendVerifyEmail = (user: UserInterface, token : string) : void => {
  const message = `Hello ${user.name}<br>
  You are almost done<br>Confirm your account below to finish creating your Ketofan account`;

  const mailOptions = {
    email: user.email,
    subject: 'Verify your account',
    message,
    button: 'CONFIRM ACCOUNT',
    link: `http://localhost:3000/api/v1/verify/${token}`,
  };

  mailService.sendEmail(mailOptions)
    .then(() => logger.info(`Sent Mail to ${user.email}`))
    .catch((error) => {
      const { code, response } = error;
      logger.error(`${code} : ${response.body.errors[0].message}`);
    });
};

export const createVerifyTokenAndSendEmail = async (user : UserInterface) => {
  const token : string = await createVerifyToken(user);
  sendVerifyEmail(user, token);
};

export const findToken = async (token : string) : Promise<any> => {
  const verifyToken = await VerifyToken.find({ token });

  if (!verifyToken || !verifyToken[0]) throw new AppError('Invalid Token', status.BAD_REQUEST);

  return verifyToken[0];
};

export const verifyUser = async (userId : string) : Promise<UserInterface> => {
  const user : UserInterface[] = await User.findById(userId)
    .returning('*')
    .update({ verified: true });

  if (!user || !user[0]) throw new AppError('User Not Found', status.NOT_FOUND);

  return user[0];
};

export const removeToken = async (token : string) : Promise<void> => {
  await VerifyToken.find({ token }).delete();
};

const verifyService = {
  createVerifyTokenAndSendEmail,
  findToken,
  verifyUser,
  removeToken,
};

export default verifyService;
