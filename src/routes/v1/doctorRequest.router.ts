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

router
  .route('/:id/approve')
  .put(
    authenticate,
    authorize(['admin', 'super_admin']),
    commonValidator.id,
    catchAsync(doctorRequestController.approve),
  );

router
  .route('/:id/reject')
  .put(
    authenticate,
    authorize(['admin', 'super_admin']),
    commonValidator.id,
    catchAsync(doctorRequestController.reject),
  );

export default router;
