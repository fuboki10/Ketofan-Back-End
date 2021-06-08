import express from 'express';
import { doctorController, appointmentController } from '../../controllers';
import catchAsync from '../../utils/catchAsync';
import { doctorValidator, commonValidator } from '../../validations';
import doctorRequestRouter from './doctorRequest.router';
import bookingRouter from './booking.router';
import workingDayRouter from './workingDay.router';
import { authenticate, authorize } from '../../middlewares/auth';

const router = express.Router({ mergeParams: true });

router.use('/request', doctorRequestRouter);
router.use('/:doctorId/bookings', commonValidator.id('doctorId'), bookingRouter);
router.use('/workingDays', workingDayRouter);

router
  .route('/appointments')
  .get(
    authenticate,
    authorize(['doctor']),
    commonValidator.get,
    catchAsync(appointmentController.getDoctorAppointments),
  );

router
  .route('/:id')
  .get(commonValidator.id('id'), catchAsync(doctorController.getById));

router
  .route('/')
  .get(commonValidator.get, doctorValidator.get, catchAsync(doctorController.get));

export default router;
