import { body, CustomValidator } from 'express-validator';
import { Specialization } from '../../models';
import validate from '../../middlewares/validate';

const isUniqueName : CustomValidator = async (value) => {
  const specialization = await Specialization.find({ name: value });
  if (specialization && specialization.length > 0) { throw new Error('Name already in use'); }
};

const editValidate = [
  // check name
  body('name', 'Please Enter a Valid name')
    .toLowerCase()
    .matches(/^[A-Z]+$/i)
    .trim()
    .escape()
    .custom(isUniqueName),

];

export default validate(editValidate);
