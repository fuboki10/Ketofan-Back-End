import { DoctorRequest, CreateDoctorRequestProps } from '../models';

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

const doctorRequestService = {
  create,
  get,
};

export default doctorRequestService;
