import { CustomValidator, param } from 'express-validator';
import validate from '../../middlewares/validate';

const checkId : CustomValidator = async (value) => {
  if (value <= 0) throw new Error('ID must be at least 1');
};

const idValidate = [
  // chech id
  param('id')
    .isInt()
    .toInt()
    .withMessage('Please Enter a valid id')
    .bail()
    .custom(checkId),
];

export default validate(idValidate);
