import status from 'http-status';
import { Patient, PatientInterface } from '../models';
import AppError from '../utils/AppError';

const selectList = [
  'patients.id',
  'users.profileImage',
  'users.mobileNumber',
  'users.name',
  'users.gender',
  'patients.bio',
];

interface PatientSearchProps {
  name?: string;
  area?: number;
  insurance?: number;
  specialization?: number;
}

export const getById = async (id : number) => {
  const patient = await Patient.db
    .select(selectList)
    .where('patients.id', id)
    .join('users', 'users.id', '=', 'patients.userId');

  if (!patient || !patient[0]) { throw new AppError('Patient with the given id is not found', status.NOT_FOUND); }

  return patient[0];
};

export const get = async (limit : number, offset : number, searchProps: PatientSearchProps) => {
  const query = Patient.db
    .select(selectList)
    .join('users', 'users.id', '=', 'patients.userId');

  // handle name search
  if (searchProps.name) {
    query.where('name', 'like', `${searchProps.name}%`);
  }

  // handle area search
  if (searchProps.area) {
    query
      .join('patient_areas', 'patient_areas.patientId', '=', 'patients.id')
      .where('patient_areas.areaId', '=', searchProps.area);
  }

  // handle insurance search
  if (searchProps.insurance) {
    query
      .join('patient_insurances', 'patient_insurances.patientId', '=', 'patients.id')
      .where('patient_insurances.insuranceId', '=', searchProps.insurance);
  }

  // handle specialization search
  if (searchProps.specialization) {
    query
      .join('patient_specializations', 'patient_specializations.patientId', '=', 'patients.id')
      .where('patient_specializations.specializationId', '=', searchProps.specialization);
  }

  const [patients, total] : any = await Promise.all([
    query.offset(offset).limit(limit),
    Patient.db.count(),
  ]);

  return { patients, total: parseInt(total[0].count, 10) };
};

export const getByUserId = async (userId : number) : Promise<PatientInterface> => {
  const patient = await Patient.db
    .select(selectList)
    .where('patients.userId', userId)
    .join('users', 'users.id', '=', 'patients.userId');

  if (!patient || !patient[0]) { throw new AppError('Patient with the given id is not found', status.NOT_FOUND); }

  return patient[0];
};

const patientService = {
  getByUserId,
  getById,
  get,
};

export default patientService;
