import express from 'express';
import catchAsync from '../../utils/catchAsync';
import { specializationController } from '../../controllers';
import { specializationValidator, commonValidator } from '../../validations';
import { authenticate, authorize } from '../../middlewares/auth';

const router = express.Router();

router
  .route('/')
  .get(
    commonValidator.get,
    catchAsync(specializationController.get),
  )
  .post(
    authenticate,
    authorize(['admin', 'super_admin']),
    specializationValidator.create,
    catchAsync(specializationController.create),
  );

router
  .route('/:id')
  .put(
    authenticate,
    authorize(['admin', 'super_admin']),
    specializationValidator.edit,
    catchAsync(specializationController.edit),
  )
  .delete(
    authenticate,
    authorize(['admin', 'super_admin']),
    specializationValidator.remove,
    catchAsync(specializationController.remove),
  );

export default router;
