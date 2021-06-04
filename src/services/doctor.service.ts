import status from 'http-status';
import { Doctor } from '../models';
import AppError from '../utils/AppError';

const selectList = [
  'doctors.id',
  'doctors.profileImage',
  'doctors.phone',
  'users.name',
  'users.gender',
  'doctors.bio',
];

interface DoctorSearchProps {
  name?: string;
  area?: number;
  insurance?: number;
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
  const [doctors, total] : any = await Promise.all([
    Doctor.db
      .select(selectList)
      .join('users', 'users.id', '=', 'doctors.userId')
      .where('name', 'like', `${searchProps.name}%`)
      .offset(offset)
      .limit(limit),

    Doctor.db.count(),
  ]);

  return { doctors, total: parseInt(total[0].count, 10) };
};

const doctorService = {
  getById,
  get,
};

export default doctorService;
