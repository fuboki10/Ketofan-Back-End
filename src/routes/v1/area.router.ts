import express from 'express';
import { areaController } from '../../controllers';
import { areaValidator, commonValidator } from '../../validations';
import { authenticate, authorize } from '../../middlewares/auth';
import catchAsync from '../../utils/catchAsync';

const router = express.Router();

router
  .route('/')
  .post(
    authenticate,
    authorize(['admin', 'super_admin']),
    areaValidator.create,
    catchAsync(areaController.create),
  )
  .get(
    commonValidator.get,
    catchAsync(areaController.get),
  );

router
  .route('/:id')
  .put(
    authenticate,
    authorize(['admin', 'super_admin']),
    areaValidator.edit,
    catchAsync(areaController.edit),
  )
  .delete(
    authenticate,
    authorize(['admin', 'super_admin']),
    areaValidator.remove,
    catchAsync(areaController.remove),
  );

export default router;
