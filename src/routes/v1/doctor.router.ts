import express from 'express';
import { doctorController } from '../../controllers';
import catchAsync from '../../utils/catchAsync';
import { doctorValidator } from '../../validations';
import doctorRequestRouter from './doctorRequest.router';

const router = express.Router();

router.use('/request', doctorRequestRouter);

router
  .route('/:id')
  .get(doctorValidator.getById, catchAsync(doctorController.getById));

router
  .route('/')
  .get(doctorValidator.get, catchAsync(doctorController.get));

export default router;
