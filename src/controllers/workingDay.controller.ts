import { Request, Response } from 'express';
import status from 'http-status';
import { workingDayService } from '../services';

export const create = async (req: Request, res : Response) => {
  const workingDays = await workingDayService.create(req.user.id, req.body);

  const days = workingDays.map(({
    id, doctorId, type, ...keep
  }) => keep);

  const { type } = req.body;

  const response = {
    status: status.OK,
    data: {
      workingDays: { type, days },
    },
  };

  res.status(status.OK).json(response);
};

export const get = async (req: Request, res : Response) => {
  const workingDays = await workingDayService.get(req.user.id);

  const days = workingDays.map(({
    id, doctorId, type, ...keep
  }) => keep);

  const { type } = req.body;

  const response = {
    status: status.OK,
    data: {
      workingDays: { type, days },
    },
  };

  res.status(status.OK).json(response);
};

const workingDayController = {
  create,
  get,
};

export default workingDayController;
