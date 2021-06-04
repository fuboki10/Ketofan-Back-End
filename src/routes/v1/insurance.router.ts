import express from 'express';
import { insuranceController } from '../../controllers';
import { insuranceValidator, commonValidator } from '../../validations';
import { authenticate, authorize } from '../../middlewares/auth';
import catchAsync from '../../utils/catchAsync';

const router = express.Router();

router
  .route('/')
  .post(
    authenticate,
    authorize(['admin', 'super_admin']),
    insuranceValidator.create,
    catchAsync(insuranceController.create),
  )
  .get(
    commonValidator.get,
    catchAsync(insuranceController.get),
  );

router
  .route('/:id')
  .put(
    authenticate,
    authorize(['admin', 'super_admin']),
    insuranceValidator.edit,
    catchAsync(insuranceController.edit),
  )
  .delete(
    authenticate,
    authorize(['admin', 'super_admin']),
    insuranceValidator.remove,
    catchAsync(insuranceController.remove),
  );

export default router;
