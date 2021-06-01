import status from 'http-status';
import { Specialization, CreateSpecializationProps } from '../models';
import AppError from '../utils/AppError';

export const getAll = async (limit : number, offset : number) => {
  const [specializations, total] : any = await Promise.all([
    Specialization.find().offset(offset).limit(limit),
    Specialization.db.count(),
  ]);

  return { specializations, total: parseInt(total[0].count, 10) };
};

export const create = async (specializationProps : CreateSpecializationProps) => {
  const specialization = await Specialization.db
    .returning('*')
    .insert(specializationProps);

  return specialization[0];
};

export const edit = async (id : number, specializationProps : CreateSpecializationProps) => {
  const specialization : any = await Specialization.db
    .update(specializationProps, '*')
    .where({ id });

  if (!specialization || !specialization[0]) { throw new AppError('Specialization with the given id is not found', status.NOT_FOUND); }

  return specialization[0];
};

export const remove = async (id : number) => {
  const specialization : any = await Specialization.db
    .returning('*')
    .delete()
    .where({ id });

  if (!specialization || !specialization[0]) { throw new AppError('Specialization with the given id is not found', status.NOT_FOUND); }

  return specialization[0];
};

const specializationService = {
  getAll,
  create,
  edit,
  remove,
};

export default specializationService;
