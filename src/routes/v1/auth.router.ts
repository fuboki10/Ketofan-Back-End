import express from 'express';
import { authController } from '../../controllers';
import catchAsync from '../../utils/catchAsync';
import { authValidator } from '../../validations';

const router = express.Router();

router.route('/signup')
  .post(authValidator.signup, catchAsync(authController.signup));

router.route('/signin')
  .post(authValidator.login, catchAsync(authController.signin));

export default router;
