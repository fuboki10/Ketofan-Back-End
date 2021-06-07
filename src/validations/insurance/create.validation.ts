import { body } from 'express-validator';
import validate from '../../middlewares/validate';

const createValidate = [
  // check name
  body('name', 'Please Enter a Valid name')
    .trim()
    .escape(),

];

export default validate(createValidate);
