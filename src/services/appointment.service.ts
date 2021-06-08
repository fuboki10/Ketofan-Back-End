import status from 'http-status';
import { Area } from '../models';
import AppError from '../utils/AppError';

export const get = async (limit : number, offset : number) => {
  const [areas, total] : any = await Promise.all([
    Area.find().offset(offset).limit(limit),
    Area.db.count(),
  ]);

  return { areas, total: parseInt(total[0].count, 10) };
};

const appointmentService = {
  get,
};

export default appointmentService;
