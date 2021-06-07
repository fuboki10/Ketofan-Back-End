import { body, CustomValidator } from 'express-validator';
import { Specialization } from '../../models';
import validate from '../../middlewares/validate';

const isUniqueName : CustomValidator = async (value) => {
  const specialization = await Specialization.find({ name: value });
  if (specialization && specialization.length > 0) { throw new Error('Name already in use'); }
};

const createValidate = [
  // check name
  body('name', 'Please Enter a Valid name')
    .isLength({ min: 1, max: 100 })
    .bail()
    .custom((value) => value.match(/^[A-Za-z ]+$/))
    .bail()
    .trim()
    .escape()
    .custom(isUniqueName),

];

export default validate(createValidate);
