import status from 'http-status';
import _ from 'lodash';
import { Response } from 'express';
import { UserInterface } from '../../models';
import { authService } from '../../services';

export const createTokenAndSend = async (user : UserInterface, res: Response) => {
  const payload = {
    id: user.id,
    role: user.role,
    verified: user.verified,
    name: user.name,
  };

  const token = await authService.generateAuthToken(payload);

  const response = {
    status: status.OK,
    token,
    data: {
      user: _(user).omit(['password', 'name_tsvector']),
    },
  };

  return res.status(status.OK).json(response);
};

export const sendUser = async (user : UserInterface, res: Response) => {
  const response = {
    status: status.OK,
    data: {
      user: _(user).omit(['password', 'name_tsvector']),
    },
  };

  return res.status(status.OK).json(response);
};
