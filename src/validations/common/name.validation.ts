import { query } from 'express-validator';
import validate from '../../middlewares/validate';

const nameValidate = [
  // check name
  query('name')
    .optional()
    .isString()
    .isLength({ min: 1, max: 100 })
    .custom((value) => value.match(/^[A-Za-z ]+$/))
    .withMessage('Please Enter a valid Name')
    .trim()
    .escape(),

];

export default validate(nameValidate);
