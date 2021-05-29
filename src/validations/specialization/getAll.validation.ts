import { CustomValidator, query } from 'express-validator';
import validate from '../../middlewares/validate';

const checkOffset : CustomValidator = async (value) => {
  if (value < 0) throw new Error('Offset Must Be at Least 0');
};

const checklimit : CustomValidator = async (value) => {
  if (value < 1) throw new Error('Limit Must Be at Least 1');
  if (value > 50) throw new Error('Limit Must Be at Most 50');
};

const loginValidate = [
  // check offset
  query('offset')
    .isInt()
    .withMessage('Please Enter a Valid offset')
    .default(0)
    .custom(checkOffset),

  // check limit
  query('limit')
    .isInt()
    .withMessage('Please Enter a Valid limit')
    .custom(checklimit),

];

export default validate(loginValidate);
