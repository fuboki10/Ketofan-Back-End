import express from 'express';
import { doctorRequestController } from '../../controllers';
import catchAsync from '../../utils/catchAsync';
import { doctorRequestValidator, commonValidator } from '../../validations';
import { authenticate, authorize } from '../../middlewares/auth';
import imageUpload from '../../middlewares/imageUpload';

const router = express.Router();

router
  .route('/')
  .post(
    catchAsync(imageUpload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'document', maxCount: 1 }])),
    doctorRequestValidator.create,
    catchAsync(doctorRequestController.create),
  )
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
    commonValidator.id('id'),
    catchAsync(doctorRequestController.approve),
  );

router
  .route('/:id/reject')
  .put(
    authenticate,
    authorize(['admin', 'super_admin']),
    commonValidator.id('id'),
    catchAsync(doctorRequestController.reject),
  );

export default router;
