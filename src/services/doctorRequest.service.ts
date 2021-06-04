import status from 'http-status';
import { DoctorRequest, CreateDoctorRequestProps } from '../models';
import AppError from '../utils/AppError';

export const create = async (doctorProps: CreateDoctorRequestProps) => {
  const doctorRequest = await DoctorRequest.db
    .returning('*')
    .insert(doctorProps);

  return doctorRequest[0];
};

export const get = async (limit : number, offset : number) => {
  const [doctorRequests, total] : any = await Promise.all([
    DoctorRequest.find().offset(offset).limit(limit),
    DoctorRequest.db.count(),
  ]);

  return { doctorRequests, total: parseInt(total[0].count, 10) };
};

export const reject = async (id: number) => {
  const request : any = await DoctorRequest.db
    .returning('*')
    .delete()
    .where({ id });

  if (!request || !request[0]) { throw new AppError('Request with the given id is not found', status.NOT_FOUND); }

  return request[0];
};

const doctorRequestService = {
  create,
  get,
  reject,
};

export default doctorRequestService;
