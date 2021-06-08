import { Request, Response } from 'express';
import status from 'http-status';
import { patientService } from '../services';

export const getById = async (req : Request, res : Response) => {
  const { id } : any = req.params;
  const patient = await patientService.getById(id);

  const response = {
    status: status.OK,
    data: {
      patient,
    },
  };

  res.status(status.OK).json(response);
};

export const get = async (req : Request, res : Response) => {
  const {
    limit, offset, name, area, insurance, specialization,
  } : any = req.query;

  const { patients, total } = await patientService.get(
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
      count: patients.length,
      total,
    },
    data: {
      patients,
    },
  };

  res.status(status.OK).json(response);
};

const patientController = {
  getById,
  get,
};

export default patientController;
