import { Request, Response } from 'express';
import status from 'http-status';
import { doctorService } from '../services';

export const getById = async (req : Request, res : Response) => {
  const { id } : any = req.params;
  const doctor = await doctorService.getById(id);

  const response = {
    status: status.OK,
    data: {
      doctor,
    },
  };

  res.status(status.OK).json(response);
};

export const get = async (req : Request, res : Response) => {
  const {
    limit, offset, name, area, insurance, specialization,
  } : any = req.query;

  const { doctors, total } = await doctorService.get(
    limit, offset,
    {
      name, area, insurance, specialization,
    },
  );

  const response = {
    status: status.OK,
    _metadata: {
      limit,
      offset,
      count: doctors.length,
      total,
    },
    data: {
      doctors,
    },
  };

  res.status(status.OK).json(response);
};

export const remove = async (req: Request, res: Response) => {
  const { id } : any = req.params;

  const doctor = await doctorService.remove(id);

  const response = {
    status: status.OK,
    data: {
      doctor,
    },
  };

  res.status(status.OK).json(response);
};

const doctorController = {
  getById,
  get,
  remove,
};

export default doctorController;
