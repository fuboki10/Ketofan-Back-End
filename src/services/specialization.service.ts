import { Specialization } from '../models';

export const getAll = async (limit : number, offset : number) => {
  const specializations = await Specialization.find().offset(offset).limit(limit);
  return specializations;
};

const specializationService = {
  getAll,
};

export default specializationService;
