import { body } from 'express-validator';
import validate from '../../middlewares/validate';

const loginValidate = [
  // check username
  body('username')
    .isLength({ min: 8 })
    .withMessage('Username Must Be at Least 8 Characters')
    .isLength({ max: 20 })
    .withMessage('Username Must Be at Most 20 Characters')
    .trim()
    .escape(),

  // check password
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password Must Be at Least 8 Characters')
    .isLength({ max: 20 })
    .withMessage('Password Must Be at Most 20 Characters')
    .trim()
    .escape(),

];

export default validate(loginValidate);
