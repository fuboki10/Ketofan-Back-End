import crypto from 'crypto';
import { VerifyToken, UserInterface } from '../models';
import mailService from './mail.service';
import logger from '../utils/logger';

const createVerifyToken = async (user: UserInterface) : Promise<string> => {
  const token = crypto.randomBytes(16).toString('base64');

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

const verifyService = {
  createVerifyTokenAndSendEmail,
};

export default verifyService;
