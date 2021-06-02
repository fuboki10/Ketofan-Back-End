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

export const get = async (req: Request, res : Response) => {
  const { limit, offset } : any = req.query;

  const { areas, total } = await areaService.get(limit, offset);

  const response = {
    status: status.OK,
    _metadata: {
      limit,
      offset,
      count: areas.length,
      total,
    },
    data: {
      areas,
    },
  };

  res.status(status.OK).json(response);
};

export const edit = async (req: Request, res : Response) => {
  const { id } : any = req.params;
  const { name } = req.body;

  const area = await areaService.edit(id, name);

  const response = {
    status: status.OK,
    data: {
      area,
    },
  };

  res.status(status.OK).json(response);
};

export const remove = async (req: Request, res : Response) => {
  const { id } : any = req.params;

  const area = await areaService.remove(id);

  const response = {
    status: status.OK,
    data: {
      area,
    },
  };

  res.status(status.OK).json(response);
};

const areaController = {
  create,
  get,
  edit,
  remove,
};

export default areaController;
