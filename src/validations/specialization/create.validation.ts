import { body } from 'express-validator';
import validate from '../../middlewares/validate';

const createValidate = [
  // check name
  body('name', 'Please Enter a Valid name')
    .isLength({ min: 1, max: 100 })
    .bail()
    .custom((value) => value.match(/^[A-Za-z ]+$/))
    .bail()
    .trim()
    .escape(),

];

export default validate(createValidate);
