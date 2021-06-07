import { body, CustomValidator } from 'express-validator';
import { User } from '../../models';
import validate from '../../middlewares/validate';

const isUniqueMobile : CustomValidator = async (value) => {
  const user = await User.find({ mobileNumber: value });
  if (user && user.length > 0) { throw new Error('Mobile Number already in use'); }
};

const editValidate = [
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

export default validate(editValidate);
