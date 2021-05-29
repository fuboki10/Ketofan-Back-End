import express from 'express';
import catchAsync from '../../utils/catchAsync';
import { specializationController } from '../../controllers';
import { specializationValidator } from '../../validations';
import { authenticate, authorize } from '../../middlewares/auth';

const router = express.Router();

router
  .route('/')
  .get(
    specializationValidator.getAll,
    catchAsync(specializationController.getAll),
  )
  .post(
    authenticate,
    authorize(['admin', 'super_admin']),
    specializationValidator.create,
    catchAsync(specializationController.create),
  );

export default router;
