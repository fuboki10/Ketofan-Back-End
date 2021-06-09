import status from 'http-status';
import { Doctor, DoctorInterface } from '../models';
import AppError from '../utils/AppError';

const essentialSelect = [
  'doctors.id',
  'users.profileImage',
  'users.mobileNumber',
  'users.name',
  'users.gender',
  'doctors.bio',
  'doctors.fees',
];

const selectList = [
  ...(essentialSelect),
  'areas.name as area',
  'areas.id as areaId',
  'insurances.name as insurance',
  'insurances.id as insuranceId',
  'specializations.name as specialization',
  'specializations.id as specializationId',
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
    .join('users', 'users.id', '=', 'doctors.userId')
    .join('doctor_areas', 'doctor_areas.doctorId', '=', 'doctors.id')
    .join('doctor_insurances', 'doctor_insurances.doctorId', '=', 'doctors.id')
    .join('doctor_specializations', 'doctor_specializations.doctorId', '=', 'doctors.id')
    .join('areas', 'areas.id', '=', 'doctor_areas.areaId')
    .join('insurances', 'insurances.id', '=', 'doctor_insurances.insuranceId')
    .join('specializations', 'specializations.id', '=', 'doctor_specializations.specializationId');

  if (!doctor || !doctor[0]) { throw new AppError('Doctor with the given id is not found', status.NOT_FOUND); }

  return doctor[0];
};

export const get = async (limit : number, offset : number, searchProps: DoctorSearchProps) => {
  const query = Doctor.db
    .select(selectList)
    .join('users', 'users.id', '=', 'doctors.userId')
    .join('doctor_areas', 'doctor_areas.doctorId', '=', 'doctors.id')
    .join('doctor_insurances', 'doctor_insurances.doctorId', '=', 'doctors.id')
    .join('doctor_specializations', 'doctor_specializations.doctorId', '=', 'doctors.id')
    .join('areas', 'areas.id', '=', 'doctor_areas.areaId')
    .join('insurances', 'insurances.id', '=', 'doctor_insurances.insuranceId')
    .join('specializations', 'specializations.id', '=', 'doctor_specializations.specializationId');

  // handle name search
  if (searchProps.name) {
    query.where('users.name', 'like', `${searchProps.name}%`);
  }

  // handle area search
  if (searchProps.area) {
    query
      .where('doctor_areas.areaId', '=', searchProps.area);
  }

  // handle insurance search
  if (searchProps.insurance) {
    query
      .where('doctor_insurances.insuranceId', '=', searchProps.insurance);
  }

  // handle specialization search
  if (searchProps.specialization) {
    query
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
    .select(essentialSelect)
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
