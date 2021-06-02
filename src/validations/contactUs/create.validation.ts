import { body } from 'express-validator';
import validate from '../../middlewares/validate';

const createValidate = [
  // check name
  body('name', 'Please Enter a valid name')
    .isString()
    .isLength({ min: 1, max: 100 })
    .bail()
    .custom((value) => value.match(/^[A-Za-z ]+$/))
    .trim()
    .escape(),

  body('mobileNumber', 'Please Enter a valid mobile number')
    .isString()
    .isMobilePhone('any'),

  // check email
  body('email', 'Please Enter a valid Email Address')
    .isEmail()
    .trim()
    .escape(),

  // check comments
  body('comments', 'Please Enter a valid comments')
    .isString()
    .isLength({ min: 1 }),

];

export default validate(createValidate);
