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

const doctorController = {
  getById,
};

export default doctorController;
