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

export const getById = async (id : number) => {
  const doctor = await Doctor.db
    .select(selectList)
    .where('doctors.id', id)
    .join('users', 'users.id', '=', 'doctors.userId');

  if (!doctor || !doctor[0]) { throw new AppError('Doctor with the given id is not found', status.NOT_FOUND); }

  return doctor[0];
};

const doctorService = {
  getById,
};

export default doctorService;
