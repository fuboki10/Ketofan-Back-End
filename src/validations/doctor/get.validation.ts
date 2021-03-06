import { CustomValidator, query } from 'express-validator';
import validate from '../../middlewares/validate';

const checkId : CustomValidator = async (value) => {
  if (value <= 0) throw new Error('ID must be at least 1');
};

const checkOffset : CustomValidator = async (value) => {
  if (value < 0) throw new Error('Offset Must Be at Least 0');
};

const checklimit : CustomValidator = async (value) => {
  if (value < 1) throw new Error('Limit Must Be at Least 1');
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

  // check offset
  query('offset')
    .default(0)
    .isInt()
    .toInt()
    .withMessage('Please Enter a valid offset')
    .custom(checkOffset),

  // check limit
  query('limit')
    .default(1000000)
    .isInt()
    .toInt()
    .withMessage('Please Enter a valid limit')
    .custom(checklimit),

];

export default validate(getValidate);
