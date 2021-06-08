import { Request, Response } from 'express';
import status from 'http-status';
import { appointmentService, doctorService } from '../services';
import { DoctorInterface } from '../models';

export const getDoctorAppointments = async (req: Request, res : Response) => {
  const { limit, offset } : any = req.query;

  const doctor : DoctorInterface = await doctorService.getByUserId(req.user.id);

  const { appointments, total } = await appointmentService
    .getDoctorAppointments({ doctor, limit, offset });

  const response = {
    status: status.OK,
    _metadata: {
      limit,
      offset,
      count: appointments.length,
      total,
    },
    data: {
      appointments,
    },
  };

  res.status(status.OK).json(response);
};

const appointmentController = {
  getDoctorAppointments,
};

export default appointmentController;
