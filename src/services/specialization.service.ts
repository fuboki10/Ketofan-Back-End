import { Specialization } from '../models';

export const getAll = async (limit : number, offset : number) => {
  const [specializations, total] : any = await Promise.all([
    Specialization.find().offset(offset).limit(limit),
    Specialization.db.count(),
  ]);

  return { specializations, total: parseInt(total[0].count, 10) };
};

export const create = async (name : string) => {
  const specialization = await Specialization.db
    .returning('*')
    .insert({ name });

  return specialization[0];
};

const specializationService = {
  getAll,
  create,
};

export default specializationService;
