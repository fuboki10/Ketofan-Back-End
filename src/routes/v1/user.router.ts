import express from 'express';
import { authenticate } from '../../middlewares/auth';
import { userController } from '../../controllers';
import { userValidator } from '../../validations';
import catchAsync from '../../utils/catchAsync';

const router = express.Router();

router.route('/me')
  .get(authenticate, catchAsync(userController.me))
  .put(authenticate, userValidator.edit, catchAsync(userController.edit));

export default router;
