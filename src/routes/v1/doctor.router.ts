import express from 'express';
import { doctorController } from '../../controllers';
import catchAsync from '../../utils/catchAsync';
import { doctorValidator, commonValidator } from '../../validations';
import doctorRequestRouter from './doctorRequest.router';
import bookingRouter from './booking.router';
import workingDayRouter from './workingDay.router';

const router = express.Router({ mergeParams: true });

router.use('/request', doctorRequestRouter);
router.use('/:id/bookings', commonValidator.id, bookingRouter);
router.use('/workingDays', workingDayRouter);

router
  .route('/:id')
  .get(commonValidator.id('id'), catchAsync(doctorController.getById));

router
  .route('/')
  .get(commonValidator.get, doctorValidator.get, catchAsync(doctorController.get));

export default router;
