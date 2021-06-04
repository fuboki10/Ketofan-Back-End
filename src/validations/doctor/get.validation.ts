import { CustomValidator, query } from 'express-validator';
import validate from '../../middlewares/validate';

const checkId : CustomValidator = async (value) => {
  if (value <= 0) throw new Error('ID must be at least 1');
};

const getValidate = [
  // check name
  query('name')
    .optional()
    .isString()
    .isLength({ min: 1, max: 100 })
    .custom((value) => value.match(/^[A-Za-z ]+$/))
    .withMessage('Please Enter a valid Name')
    .trim()
    .escape(),

  // chech area
  query('area')
    .optional()
    .isInt()
    .toInt()
    .withMessage('Please Enter a valid id')
    .bail()
    .custom(checkId),

  // chech area
  query('insurance')
    .optional()
    .isInt()
    .toInt()
    .withMessage('Please Enter a valid id')
    .bail()
    .custom(checkId),

  // chech specialization
  query('specialization')
    .optional()
    .isInt()
    .toInt()
    .withMessage('Please Enter a valid id')
    .bail()
    .custom(checkId),

];

export default validate(getValidate);
