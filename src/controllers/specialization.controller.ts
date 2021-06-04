import { Request, Response } from 'express';
import status from 'http-status';
import { specializationService } from '../services';

export const get = async (req: Request, res : Response) => {
  const { offset, limit } : any = req.query;

  const { specializations, total } = await specializationService.get(limit, offset);

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
  const specialization = await specializationService.create(req.body);

  const response = {
    status: status.OK,
    data: {
      specialization,
    },
  };

  res.status(status.OK).json(response);
};

export const edit = async (req: Request, res : Response) => {
  const { id } : any = req.params;

  const specialization = await specializationService.edit(id, req.body);

  const response = {
    status: status.OK,
    data: {
      specialization,
    },
  };

  res.status(status.OK).json(response);
};

export const remove = async (req: Request, res : Response) => {
  const { id } : any = req.params;

  const specialization = await specializationService.remove(id);

  const response = {
    status: status.OK,
    data: {
      specialization,
    },
  };

  res.status(status.OK).json(response);
};

const specializationController = {
  get,
  create,
  edit,
  remove,
};

export default specializationController;
