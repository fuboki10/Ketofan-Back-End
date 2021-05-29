import { Request, Response } from 'express';
import status from 'http-status';
import { specializationService } from '../services';

export const getAll = async (req: Request, res : Response) => {
  const { offset, limit } : any = req.query;

  const { specializations, total } = await specializationService.getAll(limit, offset);

  const response = {
    status: status.OK,
    _metadata: {
      limit,
      offset,
      count: specializations.length,
      total,
    },
    data: {
      specializations,
    },
  };

  res.status(status.OK).json(response);
};

export const create = async (req: Request, res : Response) => {
  const { name } = req.body;

  const specialization = await specializationService.create(name);

  const response = {
    status: status.OK,
    data: {
      specialization,
    },
  };

  res.status(status.OK).json(response);
};

const specializationController = {
  getAll,
  create,
};

export default specializationController;
