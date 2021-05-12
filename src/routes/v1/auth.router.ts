import express from 'express';
import { authController } from '../../controllers';
import catchAsync from '../../utils/catchAsync';

const router = express.Router();

router.route('/signup')
  .post(catchAsync(authController.signup));

router.route('/signin')
  .post(catchAsync(authController.signin));

export default router;
