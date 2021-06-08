import { body } from 'express-validator';
import validate from '../../middlewares/validate';

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
    .isInt()
    .trim()
    .escape(),

  body('days[*].slots', 'Please Enter a valid slots')
    .isInt()
    .trim()
    .escape(),

];

export default validate(createValidate);
