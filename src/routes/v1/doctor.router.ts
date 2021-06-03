import express from 'express';
import { doctorController } from '../../controllers';
import catchAsync from '../../utils/catchAsync';

const router = express.Router();

router
  .route('/:id')
  .get(catchAsync(doctorController.getById));

export default router;
