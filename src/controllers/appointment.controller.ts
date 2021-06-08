import { Request, Response } from 'express';
import status from 'http-status';
import { appointmentService, doctorService, patientService } from '../services';
import { DoctorInterface, PatientInterface } from '../models';

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

export const getPatientAppointments = async (req: Request, res : Response) => {
  const { limit, offset } : any = req.query;

  const patient : PatientInterface = await patientService.getByUserId(req.user.id);

  const { appointments, total } = await appointmentService
    .getPatientAppointments({ patient, limit, offset });

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

export const get = async (req: Request, res : Response) => {
  if (req.user.role === 'doctor') return getDoctorAppointments(req, res);
  if (req.user.role === 'patient') return getPatientAppointments(req, res);
  throw new Error('Only Doctors and Patients can run this');
};

const appointmentController = {
  get,
};

export default appointmentController;
