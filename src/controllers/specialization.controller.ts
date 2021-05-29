import { Request, Response } from 'express';
import status from 'http-status';
import { specializationService } from '../services';

export const getAll = async (req: Request, res : Response) => {
  const { offset, limit } : any = req.query;

  const specializations = await specializationService.getAll(limit, offset);

  const response = {
    status: status.OK,
    data: {
      specializations,
    },
  };

  res.status(status.OK).json(response);
};

const specializationController = {
  getAll,
};

export default specializationController;
