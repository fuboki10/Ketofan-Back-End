import { Request, Response } from 'express';
import status from 'http-status';
import { doctorRequestService } from '../services';

export const create = async (req: Request, res: Response) => {
  const doctorRequest = await doctorRequestService.create(req.body);

  const response = {
    status: status.OK,
    data: {
      doctorRequest,
    },
  };

  res.status(status.OK).json(response);
};

const doctorRequestController = {
  create,
};

export default doctorRequestController;
