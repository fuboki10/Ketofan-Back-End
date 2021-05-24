import { Request, Response } from 'express';
import { verifyService } from '../services';
import { createTokenAndSend } from './helpers/sendUser';

export const verify = async (req: Request, res : Response) => {
  const { token } = req.params;

  const verifyToken = await verifyService.findToken(token);

  const user = await verifyService.verifyUser(verifyToken.userId);

  verifyService.removeToken(token);

  return createTokenAndSend(user, res);
};

const verifyController = {
  verify,
};

export default verifyController;
