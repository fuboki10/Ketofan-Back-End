import { body, CustomValidator } from 'express-validator';
import validate from '../../middlewares/validate';
import { DoctorRequest, User } from '../../models';

const isUniqueEmail : CustomValidator = async (value) => {
  const [doctorRequest, user] : any = await Promise.all([
    DoctorRequest.find({ email: value }),
    User.find({ email: value }),
  ]);

  if (doctorRequest && doctorRequest.length > 0) { throw new Error('E-mail already in use'); }
  if (user && user.length > 0) { throw new Error('E-mail already in use'); }
};

const checkId : CustomValidator = async (value) => {
  if (value <= 0) throw new Error('ID must be at least 1');
};

const isUniqueMobile : CustomValidator = async (value) => {
  const [doctorRequest, user] : any = await Promise.all([
    DoctorRequest.find({ mobileNumber: value }),
    User.find({ mobileNumber: value }),
  ]);

  if (doctorRequest && doctorRequest.length > 0) { throw new Error('Mobile Number already in use'); }
  if (user && user.length > 0) { throw new Error('Mobile Number already in use'); }
};

const createValidate = [
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

  // check email
  body('email', 'Please Enter a valid Email Address')
    .isEmail()
    .trim()
    .escape()
    .custom(isUniqueEmail),

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

  // chech id
  body('specializationId')
    .isInt()
    .toInt()
    .withMessage('Please Enter a valid id')
    .bail()
    .custom(checkId),

  // chech id
  body('areaId')
    .isInt()
    .toInt()
    .withMessage('Please Enter a valid id')
    .bail()
    .custom(checkId),

  // check bio
  body('bio', 'Please Enter a valid ')
    .isString(),

  body('mobileNumber', 'Please Enter a valid mobile number')
    .isMobilePhone('any')
    .bail()
    .custom(isUniqueMobile),

];

export default validate(createValidate);
