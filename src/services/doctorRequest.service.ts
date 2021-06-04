import { DoctorRequest, CreateDoctorRequestProps } from '../models';

export const create = async (doctorProps: CreateDoctorRequestProps) => {
  const doctorRequest = await DoctorRequest.db
    .returning('*')
    .insert(doctorProps);

  return doctorRequest[0];
};

const doctorRequestService = {
  create,
};

export default doctorRequestService;
