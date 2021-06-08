import express from 'express';
import { bookingController } from '../../controllers';
import catchAsync from '../../utils/catchAsync';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(catchAsync(bookingController.get));

export default router;
