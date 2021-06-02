import { ContactUs, CreateContactUsProps } from '../models';

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

const contactUsService = {
  get,
  create,
};

export default contactUsService;
