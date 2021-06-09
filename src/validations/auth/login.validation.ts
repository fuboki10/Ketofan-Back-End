import { body } from 'express-validator';
import validate from '../../middlewares/validate';

const loginValidate = [
  // check email
  body('email', 'Please Enter a valid Email Address')
    .isEmail()
    .trim()
    .escape(),

  // check password
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password Must Be at Least 8 Characters')
    .isLength({ max: 50 })
    .withMessage('Password Must Be at Most 50 Characters')
    .trim()
    .escape(),

];

export default validate(loginValidate);
