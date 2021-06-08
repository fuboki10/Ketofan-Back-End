import express from 'express';
import { contactUsController } from '../../controllers';
import { contactUsValidator, commonValidator } from '../../validations';
import { authenticate, authorize } from '../../middlewares/auth';
import catchAsync from '../../utils/catchAsync';

const router = express.Router();

router.route('/')
  .post(contactUsValidator.create, catchAsync(contactUsController.create))
  .get(
    authenticate,
    authorize(['admin', 'super_admin']),
    commonValidator.get,
    catchAsync(contactUsController.get),
  );

router.route('/:id')
  .delete(
    authenticate,
    authorize(['admin', 'super_admin']),
    commonValidator.id('id'),
    catchAsync(contactUsController.removeById),
  );

export default router;
