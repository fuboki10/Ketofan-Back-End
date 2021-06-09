import express from 'express';
import { workingDayController } from '../../controllers';
import { workingDayValidator } from '../../validations';
import catchAsync from '../../utils/catchAsync';
import { authenticate, authorize } from '../../middlewares/auth';

const router = express.Router();

// only for doctors
router.use(authenticate);
authorize(['doctor']);

router.route('/')
  .post(workingDayValidator.create, catchAsync(workingDayController.create))
  .get(catchAsync(workingDayController.get));

export default router;
