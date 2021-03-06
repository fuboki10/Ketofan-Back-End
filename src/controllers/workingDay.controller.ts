import { Request, Response } from 'express';
import status from 'http-status';
import { workingDayService, doctorService } from '../services';

export const create = async (req: Request, res : Response) => {
  const doctor = await doctorService.getByUserId(req.user.id);

  const workingDays = await workingDayService.create(doctor.id, req.body);

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
  const doctor = await doctorService.getByUserId(req.user.id);

  const workingDays = await workingDayService.get(doctor.id);

  const currentType = workingDays.length ? workingDays[0].type : undefined;

  const days = workingDays.map(({
    id, doctorId, type, ...keep
  }) => keep);

  const response = {
    status: status.OK,
    data: {
      workingDays: { type: currentType, days },
    },
  };

  res.status(status.OK).json(response);
};

const workingDayController = {
  create,
  get,
};

export default workingDayController;
