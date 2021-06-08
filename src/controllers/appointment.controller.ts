import { Request, Response } from 'express';
import status from 'http-status';
import { areaService } from '../services';

export const create = async (req: Request, res : Response) => {
  const { name } = req.body;

  const area = await areaService.create(name);

  const response = {
    status: status.OK,
    data: {
      area,
    },
  };

  res.status(status.OK).json(response);
};

const appointmentController = {
  create,
};

export default appointmentController;
