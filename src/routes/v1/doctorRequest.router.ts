import express from 'express';
import { doctorRequestController } from '../../controllers';
import catchAsync from '../../utils/catchAsync';
import { doctorRequestValidator } from '../../validations';

const router = express.Router();

router
  .route('/')
  .post(doctorRequestValidator.create, catchAsync(doctorRequestController.create));

export default router;
