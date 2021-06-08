import { Request, Response } from 'express';
import status from 'http-status';
import { workingDayService } from '../services';

export const create = async (req: Request, res : Response) => {
  const workingDay = await workingDayService.create(req.user.id, req.body);

  const days = workingDay.map(({
    id, doctorId, type, ...keep
  }) => keep);

  const { type } = req.body;

  const response = {
    status: status.OK,
    data: {
      workingDay: { type, days },
    },
  };

  res.status(status.OK).json(response);
};

const workingDayController = {
  create,
};

export default workingDayController;
