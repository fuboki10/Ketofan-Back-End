import express from 'express';
import { doctorController } from '../../controllers';
import catchAsync from '../../utils/catchAsync';
import { doctorValidator } from '../../validations';

const router = express.Router();

router
  .route('/:id')
  .get(doctorValidator.getById, catchAsync(doctorController.getById));

export default router;
