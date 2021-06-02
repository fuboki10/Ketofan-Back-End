import status from 'http-status';
import { Insurance } from '../models';
import AppError from '../utils/AppError';

export const get = async (limit : number, offset : number) => {
  const [insurances, total] : any = await Promise.all([
    Insurance.find().offset(offset).limit(limit),
    Insurance.db.count(),
  ]);

  return { insurances, total: parseInt(total[0].count, 10) };
};

export const create = async (name : string) => {
  const insurance = await Insurance.db
    .returning('*')
    .insert({ name });

  return insurance[0];
};

export const remove = async (id : number) => {
  const insurance : any = await Insurance.db
    .returning('*')
    .delete()
    .where({ id });

  if (!insurance || !insurance[0]) { throw new AppError('Insurance with the given id is not found', status.NOT_FOUND); }

  return insurance[0];
};

export const edit = async (id : number, name : string) => {
  const insurance : any = await Insurance.db
    .update({ name }, '*')
    .where({ id });

  if (!insurance || !insurance[0]) { throw new AppError('Insurance with the given id is not found', status.NOT_FOUND); }

  return insurance[0];
};

const insuranceService = {
  get,
  create,
  remove,
  edit,
};

export default insuranceService;
