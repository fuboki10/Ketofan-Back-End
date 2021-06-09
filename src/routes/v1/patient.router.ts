import express from 'express';
import { appointmentController, patientController } from '../../controllers';
import { authenticate, authorize } from '../../middlewares/auth';
import catchAsync from '../../utils/catchAsync';
import { commonValidator } from '../../validations';

const router = express.Router();

router
  .route('/appointments')
  .get(
    authenticate,
    authorize(['patient']),
    commonValidator.get,
    catchAsync(appointmentController.getPatientAppointments),
  );

router
  .route('/appointments/:id')
  .delete(
    authenticate,
    authorize(['patient']),
    commonValidator.id('id'),
    catchAsync(appointmentController.remove),
  );

router
  .route('/:id')
  .get(commonValidator.id('id'), catchAsync(patientController.getById));

router
  .route('/')
  .get(commonValidator.get, commonValidator.name, catchAsync(patientController.get));

export default router;
