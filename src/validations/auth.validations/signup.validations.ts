import { body, CustomValidator } from 'express-validator';
import { User } from '../../models';
import validate from '../../middlewares/validate';

const isUniqueEmail : CustomValidator = async (value) => {
  const user = await User.find({ email: value });
  if (user && user.length > 0) { throw new Error('E-mail already in use'); }
};

const isUniqueUser : CustomValidator = async (value) => {
  const user = await User.find({ username: value });
  if (user && user.length > 0) { throw new Error('Username already in use'); }
};

const signupValidate = [
  // check username
  body('username')
    .isLength({ min: 8 })
    .withMessage('Username Must Be at Least 8 Characters')
    .isLength({ max: 20 })
    .withMessage('Username Must Be at Most 20 Characters')
    .trim()
    .escape()
    .custom(isUniqueUser),

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

  // check role
  body('role')
    .isString()
    .toLowerCase()
    .isIn(['super_admin', 'admin', 'doctor', 'patient'])
    .trim()
    .escape(),

];

export default validate(signupValidate);
