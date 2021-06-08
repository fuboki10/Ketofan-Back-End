import express from 'express';
import { doctorController } from '../../controllers';
import catchAsync from '../../utils/catchAsync';
import { doctorValidator, commonValidator } from '../../validations';
import doctorRequestRouter from './doctorRequest.router';
import bookingRouter from './booking.router';

const router = express.Router();

router.use('/request', doctorRequestRouter);
router.use('/:id/bookings', bookingRouter);

router
  .route('/:id')
  .get(commonValidator.id, catchAsync(doctorController.getById));

router
  .route('/')
  .get(commonValidator.get, doctorValidator.get, catchAsync(doctorController.get));

export default router;
