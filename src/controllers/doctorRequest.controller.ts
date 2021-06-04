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

export const get = async (req: Request, res : Response) => {
  const { limit, offset } : any = req.query;

  const { doctorRequests, total } = await doctorRequestService.get(limit, offset);

  const response = {
    status: status.OK,
    _metadata: {
      limit,
      offset,
      count: doctorRequests.length,
      total,
    },
    data: {
      doctorRequests,
    },
  };

  res.status(status.OK).json(response);
};

const doctorRequestController = {
  create,
  get,
};

export default doctorRequestController;
