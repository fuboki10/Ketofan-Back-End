import authValidator from './auth';
import specializationValidator from './specialization';
import contactUsValidator from './contactUs';
import areaValidator from './area';
import insuranceValidator from './insurance';
import doctorValidator from './doctor';
import doctorRequestValidator from './doctorRequest';
import commonValidator from './common';

const validators = {
  authValidator,
  specializationValidator,
  contactUsValidator,
  areaValidator,
  insuranceValidator,
  doctorValidator,
  doctorRequestValidator,
  commonValidator,
};

export default validators;

export {
  authValidator,
  specializationValidator,
  contactUsValidator,
  areaValidator,
  insuranceValidator,
  doctorValidator,
  doctorRequestValidator,
  commonValidator,
};
