import { body } from 'express-validator';
import validate from '../../middlewares/validate';

const editPasswordValidate = [
  // check oldPassword
  body('oldPassword')
    .isLength({ min: 8 })
    .withMessage('Password Must Be at Least 8 Characters')
    .isLength({ max: 20 })
    .withMessage('Password Must Be at Most 20 Characters')
    .trim()
    .escape(),

  // check newPassword
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('Password Must Be at Least 8 Characters')
    .isLength({ max: 20 })
    .withMessage('Password Must Be at Most 20 Characters')
    .trim()
    .escape(),
];

export default validate(editPasswordValidate);
