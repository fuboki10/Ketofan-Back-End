import { body } from 'express-validator';
import validate from '../../middlewares/validate';

const signupValidate = [
  // check username
  body('username')
    .exists()
    .withMessage('Please Enter Username')
    .isLength({ min: 8 })
    .withMessage('Username Must Be at Least 8 Characters')
    .isLength({ min: 20 })
    .withMessage('Username Must Be at Most 20 Characters')
    .trim()
    .escape(),

  // check password
  body('username')
    .exists()
    .withMessage('Please Enter Your Password')
    .isLength({ min: 8 })
    .withMessage('Password Must Be at Least 8 Characters')
    .isLength({ max: 20 })
    .withMessage('Password Must Be at Most 20 Characters')
    .trim()
    .escape(),

];

export default validate(signupValidate);
