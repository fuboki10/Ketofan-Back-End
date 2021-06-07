import express from 'express';
import { authController } from '../../controllers';
import catchAsync from '../../utils/catchAsync';
import { commonValidator } from '../../validations';

const router = express.Router();

router.route('/:id')
  .get(commonValidator.id, catchAsync(authController.signup));

export default router;
