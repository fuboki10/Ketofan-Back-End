import { CustomValidator, query } from 'express-validator';
import validate from '../../middlewares/validate';

const checkOffset : CustomValidator = async (value) => {
  if (value < 0) throw new Error('Offset Must Be at Least 0');
};

const checklimit : CustomValidator = async (value) => {
  if (value < 1) throw new Error('Limit Must Be at Least 1');
  if (value > 50) throw new Error('Limit Must Be at Most 50');
};

const getValidate = [
  // check offset
  query('offset')
    .default(0)
    .isInt()
    .toInt()
    .withMessage('Please Enter a valid offset')
    .custom(checkOffset),

  // check limit
  query('limit')
    .default(25)
    .isInt()
    .toInt()
    .withMessage('Please Enter a valid limit')
    .custom(checklimit),

];

export default validate(getValidate);
