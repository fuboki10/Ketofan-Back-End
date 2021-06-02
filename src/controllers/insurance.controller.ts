import { Request, Response } from 'express';
import status from 'http-status';
import { insuranceService } from '../services';

export const create = async (req: Request, res : Response) => {
  const { name } = req.body;

  const insurance = await insuranceService.create(name);

  const response = {
    status: status.OK,
    data: {
      insurance,
    },
  };

  res.status(status.OK).json(response);
};

export const get = async (req: Request, res : Response) => {
  const { limit, offset } : any = req.query;

  const { insurances, total } = await insuranceService.get(limit, offset);

  const response = {
    status: status.OK,
    _metadata: {
      limit,
      offset,
      count: insurances.length,
      total,
    },
    data: {
      insurances,
    },
  };

  res.status(status.OK).json(response);
};

export const edit = async (req: Request, res : Response) => {
  const { id } : any = req.params;
  const { name } = req.body;

  const insurance = await insuranceService.edit(id, name);

  const response = {
    status: status.OK,
    data: {
      insurance,
    },
  };

  res.status(status.OK).json(response);
};

export const remove = async (req: Request, res : Response) => {
  const { id } : any = req.params;

  const insurance = await insuranceService.remove(id);

  const response = {
    status: status.OK,
    data: {
      insurance,
    },
  };

  res.status(status.OK).json(response);
};

const insuranceController = {
  create,
  get,
  edit,
  remove,
};

export default insuranceController;
