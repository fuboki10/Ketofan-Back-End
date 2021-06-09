import { body, CustomValidator } from 'express-validator';
import { User } from '../../models';
import validate from '../../middlewares/validate';

const isUniqueEmail : CustomValidator = async (value) => {
  const user = await User.find({ email: value });
  if (user && user.length > 0) { throw new Error('E-mail already in use'); }
};

const isUniqueMobile : CustomValidator = async (value) => {
  const user = await User.find({ mobileNumber: value });
  if (user && user.length > 0) { throw new Error('Mobile Number already in use'); }
};

const signupValidate = [
  // check email
  body('email', 'Please Enter a valid Email Address')
    .isEmail()
    .trim()
    .escape()
    .custom(isUniqueEmail),

  // check password
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password Must Be at Least 8 Characters')
    .isLength({ max: 50 })
    .withMessage('Password Must Be at Most 50 Characters')
    .trim()
    .escape(),

  // check name
  body('name')
    .isString()
    .bail()
    .isLength({ min: 1, max: 100 })
    .bail()
    .custom((value) => value.match(/^[A-Za-z ]+$/))
    .withMessage('Please Enter a valid Name')
    .trim()
    .escape(),

  // check gender
  body('gender')
    .isString()
    .bail()
    .isIn(['M', 'F'])
    .withMessage('Please Enter a valid gender'),

  // chech dateOfBirth
  body('dateOfBirth', 'Please Enter a valid date of birth')
    .isString()
    .bail()
    .isDate()
    .trim()
    .escape(),

  body('mobileNumber', 'Please Enter a valid mobile number')
    .isMobilePhone('any')
    .bail()
    .custom(isUniqueMobile),

];

export default validate(signupValidate);
