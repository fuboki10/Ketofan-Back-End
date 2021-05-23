import { body, CustomValidator } from 'express-validator';
import { User } from '../../models';
import validate from '../../middlewares/validate';

const isUniqueEmail : CustomValidator = async (value) => {
  const user = await User.find({ email: value });
  if (user && user.length > 0) { throw new Error('E-mail already in use'); }
};

const signupValidate = [
  // check email
  body('email', 'Please Enter a valid Email Address')
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail()
    .custom(isUniqueEmail),

  // check password
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password Must Be at Least 8 Characters')
    .isLength({ max: 20 })
    .withMessage('Password Must Be at Most 20 Characters')
    .trim()
    .escape(),

  // check name
  body('name')
    .isString()
    .isLength({ min: 1, max: 100 })
    .isAlpha()
    .withMessage('Please Enter a Valid Name')
    .trim()
    .escape(),

  // check gender
  body('gender')
    .isString()
    .isIn(['M', 'F'])
    .withMessage('Please Enter a Valid gender'),

];

export default validate(signupValidate);
