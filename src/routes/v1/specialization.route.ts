import express from 'express';
import catchAsync from '../../utils/catchAsync';
import { specializationController } from '../../controllers';
import { specializationValidator } from '../../validations';

const router = express.Router();

router
  .route('/')
  .get(
    specializationValidator.getAll,
    catchAsync(specializationController.getAll),
  );

export default router;
