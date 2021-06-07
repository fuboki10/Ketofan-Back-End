import { body, CustomValidator, param } from 'express-validator';
import { Insurance } from '../../models';
import validate from '../../middlewares/validate';

const isUniqueName : CustomValidator = async (value) => {
  const insurance = await Insurance.find({ name: value });
  if (insurance && insurance.length > 0) { throw new Error('Name already in use'); }
};

const checkId : CustomValidator = async (value) => {
  if (value <= 0) throw new Error('ID must be at least 1');
};

const editValidate = [
  // chech id
  param('id')
    .isInt()
    .toInt()
    .withMessage('Please Enter a valid id')
    .bail()
    .custom(checkId),

  // check name
  body('name', 'Please Enter a valid name')
    .trim()
    .escape()
    .custom(isUniqueName),

];

export default validate(editValidate);
