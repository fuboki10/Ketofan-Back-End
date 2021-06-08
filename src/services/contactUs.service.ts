import status from 'http-status';
import { ContactUs, CreateContactUsProps } from '../models';
import AppError from '../utils/AppError';

export const get = async (limit : number, offset : number) => {
  const [contactUs, total] : any = await Promise.all([
    ContactUs.find().offset(offset).limit(limit),
    ContactUs.db.count(),
  ]);

  return { contactUs, total: parseInt(total[0].count, 10) };
};

export const create = async (contactUsProps : CreateContactUsProps) => {
  const contactUs = await ContactUs.db
    .returning('*')
    .insert(contactUsProps);

  return contactUs[0];
};

export const removeById = async (id: number) => {
  const contactUs : any = await ContactUs.db
    .returning('*')
    .where({ id })
    .delete();

  if (!contactUs || !contactUs[0]) { throw new AppError('ContactUs with the given id is not found', status.NOT_FOUND); }

  return contactUs[0];
};

const contactUsService = {
  get,
  create,
  removeById,
};

export default contactUsService;
