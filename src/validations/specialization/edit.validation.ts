import { body, CustomValidator, param } from 'express-validator';
import { Specialization } from '../../models';
import validate from '../../middlewares/validate';

const isUniqueName : CustomValidator = async (value) => {
  const specialization = await Specialization.find({ name: value });
  if (specialization && specialization.length > 0) { throw new Error('Name already in use'); }
};

const checkId : CustomValidator = async (value) => {
  if (value <= 0) throw new Error('ID must be at least 1');
};

const createValidate = [
  // chech id
  param('id')
    .isInt()
    .toInt()
    .withMessage('Please Enter a valid id')
    .bail()
    .custom(checkId),

  // check name
  body('name', 'Please Enter a valid name')
    .toLowerCase()
    .matches(/^[A-Z]+$/i)
    .trim()
    .escape()
    .bail()
    .custom(isUniqueName),

];

export default validate(createValidate);
