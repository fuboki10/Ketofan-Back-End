import express from 'express';
import { workingDayController } from '../../controllers';
import { workingDayValidator } from '../../validations';
import catchAsync from '../../utils/catchAsync';
import { authenticate, authorize } from '../../middlewares/auth';

const router = express.Router();

// only for doctors
router.use(authenticate);

router.route('/')
  .post(workingDayValidator.create, authorize(['patient']), catchAsync(workingDayController.create))
  .get(authorize(['doctor']), catchAsync(workingDayController.get));

export default router;
