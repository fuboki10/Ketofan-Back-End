import express from 'express';
import { authController } from '../../controllers';
import catchAsync from '../../utils/catchAsync';
import { authValidator } from '../../validations';
import { authenticate, authorize } from '../../middlewares/auth';

const router = express.Router();

// only for doctors
router.use(authenticate);
router.use(authorize(['doctor']));

router.route('/')
  .post(authValidator.signup, catchAsync(authController.signup));

export default router;
