import status from 'http-status';
import { Doctor, DoctorInterface } from '../models';
import AppError from '../utils/AppError';

const selectList = [
  'doctors.id',
  'users.profileImage',
  'users.mobileNumber',
  'users.name',
  'users.gender',
  'doctors.bio',
];

interface DoctorSearchProps {
  name?: string;
  area?: number;
  insurance?: number;
  specialization?: number;
}

export const getById = async (id : number) => {
  const doctor = await Doctor.db
    .select(selectList)
    .where('doctors.id', id)
    .join('users', 'users.id', '=', 'doctors.userId');

  if (!doctor || !doctor[0]) { throw new AppError('Doctor with the given id is not found', status.NOT_FOUND); }

  return doctor[0];
};

export const get = async (limit : number, offset : number, searchProps: DoctorSearchProps) => {
  const query = Doctor.db
    .select(selectList)
    .join('users', 'users.id', '=', 'doctors.userId');

  // handle name search
  if (searchProps.name) {
    query.where('name', 'like', `${searchProps.name}%`);
  }

  // handle area search
  if (searchProps.area) {
    query
      .join('doctor_areas', 'doctor_areas.doctorId', '=', 'doctors.id')
      .where('doctor_areas.areaId', '=', searchProps.area);
  }

  // handle insurance search
  if (searchProps.insurance) {
    query
      .join('doctor_insurances', 'doctor_insurances.doctorId', '=', 'doctors.id')
      .where('doctor_insurances.insuranceId', '=', searchProps.insurance);
  }

  // handle specialization search
  if (searchProps.specialization) {
    query
      .join('doctor_specializations', 'doctor_specializations.doctorId', '=', 'doctors.id')
      .where('doctor_specializations.specializationId', '=', searchProps.specialization);
  }

  const [doctors, total] : any = await Promise.all([
    query.offset(offset).limit(limit),
    Doctor.db.count(),
  ]);

  return { doctors, total: parseInt(total[0].count, 10) };
};

export const getByUserId = async (userId : number) : Promise<DoctorInterface> => {
  const doctor = await Doctor.db
    .select(selectList)
    .where('doctors.userId', userId)
    .join('users', 'users.id', '=', 'doctors.userId');

  if (!doctor || !doctor[0]) { throw new AppError('Doctor with the given id is not found', status.NOT_FOUND); }

  return doctor[0];
};

const doctorService = {
  getByUserId,
  getById,
  get,
};

export default doctorService;
