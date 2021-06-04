import { body, CustomValidator } from 'express-validator';
import validate from '../../middlewares/validate';
import { Area } from '../../models';

const isUniqueName : CustomValidator = async (value) => {
  const area = await Area.find({ name: value });
  if (area && area.length > 0) { throw new Error('Name already in use'); }
};

const createValidate = [
  // check name
  body('name', 'Please Enter a Valid name')
    .toLowerCase()
    .matches(/^[A-Z]+$/i)
    .bail()
    .trim()
    .escape()
    .custom(isUniqueName),

];

export default validate(createValidate);
