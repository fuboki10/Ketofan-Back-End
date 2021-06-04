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

export default router;
