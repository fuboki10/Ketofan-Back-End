import express from 'express';
import { doctorRequestController } from '../../controllers';
import catchAsync from '../../utils/catchAsync';
import { doctorRequestValidator, commonValidator } from '../../validations';
import { authenticate, authorize } from '../../middlewares/auth';

const router = express.Router();

router
  .route('/')
  .post(doctorRequestValidator.create, catchAsync(doctorRequestController.create))
  .get(
    authenticate,
    authorize(['admin', 'super_admin']),
    commonValidator.get,
    catchAsync(doctorRequestController.get),
  );

export default router;
