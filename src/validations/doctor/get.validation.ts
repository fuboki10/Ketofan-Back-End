import { CustomValidator, query } from 'express-validator';
import validate from '../../middlewares/validate';

const checkOffset : CustomValidator = async (value) => {
  if (value < 0) throw new Error('Offset Must Be at Least 0');
};

const checklimit : CustomValidator = async (value) => {
  if (value < 1) throw new Error('Limit Must Be at Least 1');
  if (value > 50) throw new Error('Limit Must Be at Most 50');
};

const checkId : CustomValidator = async (value) => {
  if (value <= 0) throw new Error('ID must be at least 1');
};

const getValidate = [
  // check offset
  query('offset')
    .isInt()
    .toInt()
    .withMessage('Please Enter a Valid offset')
    .default(0)
    .custom(checkOffset),

  // check limit
  query('limit')
    .isInt()
    .toInt()
    .withMessage('Please Enter a Valid limit')
    .default(25)
    .custom(checklimit),

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

];

export default validate(getValidate);
