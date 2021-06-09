import express from 'express';
import { bookingController } from '../../controllers';
import catchAsync from '../../utils/catchAsync';
import { authenticate, authorize } from '../../middlewares/auth';
import { commonValidator } from '../../validations';

const router = express.Router({ mergeParams: true });

router
  .route('/:bookingId')
  .post(
    authenticate,
    authorize(['patient']),
    commonValidator.id('bookingId'),
    catchAsync(bookingController.create),
  );

router
  .route('/')
  .get(catchAsync(bookingController.get));

export default router;
