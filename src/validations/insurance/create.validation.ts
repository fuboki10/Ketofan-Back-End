import { body, CustomValidator } from 'express-validator';
import validate from '../../middlewares/validate';
import { Insurance } from '../../models';

const isUniqueName : CustomValidator = async (value) => {
  const insurance = await Insurance.find({ name: value });
  if (insurance && insurance.length > 0) { throw new Error('Name already in use'); }
};

const createValidate = [
  // check name
  body('name', 'Please Enter a Valid name')
    .toLowerCase()
    .trim()
    .escape()
    .custom(isUniqueName),

];

export default validate(createValidate);
