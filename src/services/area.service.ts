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

export const create = async (name : string) => {
  const area = await Area.db
    .returning('*')
    .insert({ name });

  return area[0];
};

export const remove = async (id : number) => {
  const area : any = await Area.db
    .returning('*')
    .delete()
    .where({ id });

  if (!area || !area[0]) { throw new AppError('Area with the given id is not found', status.NOT_FOUND); }

  return area[0];
};

export const edit = async (id : number, name : string) => {
  const area : any = await Area.db
    .update({ name }, '*')
    .where({ id });

  if (!area || !area[0]) { throw new AppError('Area with the given id is not found', status.NOT_FOUND); }

  return area[0];
};

const areaService = {
  get,
  create,
  remove,
  edit,
};

export default areaService;
