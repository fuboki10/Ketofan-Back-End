import express from 'express';
import { appointmentController } from '../../controllers';
import { authenticate, authorize } from '../../middlewares/auth';
import catchAsync from '../../utils/catchAsync';
import { commonValidator } from '../../validations';

const router = express.Router();

router
  .route('/')
  .get(
    authenticate,
    authorize(['doctor']),
    commonValidator.get,
    catchAsync(appointmentController.getDoctorAppointments),
  );

export default router;
