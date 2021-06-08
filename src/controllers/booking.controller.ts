import { Request, Response } from 'express';
import status from 'http-status';
import { bookingsService, appointmentService } from '../services';

export const get = async (req: Request, res : Response) => {
  const { doctorId } : any = req.params;

  const bookings = await bookingsService.get(doctorId);

  const response = {
    status: status.OK,
    data: {
      bookings,
    },
  };

  res.status(status.OK).json(response);
};

export const create = async (req: Request, res : Response) => {
  const patientId = req.user.id;
  const { doctorId, bookingId } : any = req.params;

  const appointment = await appointmentService.create({ bookingId, patientId, doctorId });

  const response = {
    status: status.OK,
    data: {
      appointment,
    },
  };

  res.status(status.OK).json(response);
};

const bookingController = {
  get,
  create,
};

export default bookingController;
