import { body, CustomValidator } from 'express-validator';
import validate from '../../middlewares/validate';

const check : CustomValidator = async (value) => {
  if (value <= 0) throw new Error('Value must be at least 1');
};

const createValidate = [
  body('type', 'Please Enter a valid type')
    .isString()
    .bail()
    .isIn(['reservation', 'fifo'])
    .trim()
    .escape(),

  body('days', 'Please Enter a valid days')
    .isArray(),

  body('days[*].day', 'Please Enter a valid day')
    .isString()
    .bail()
    .isIn(['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
    .trim()
    .escape(),

  body('days[*].from', 'Please Enter a valid from')
    .isString()
    .trim()
    .escape(),

  body('days[*].to', 'Please Enter a valid to')
    .isString()
    .trim()
    .escape(),

  body('days[*].duration', 'Please Enter a valid duration')
    .optional()
    .isInt()
    .bail()
    .custom(check),

  body('days[*].slots', 'Please Enter a valid slots')
    .optional()
    .isInt()
    .bail()
    .custom(check),

];

export default validate(createValidate);
