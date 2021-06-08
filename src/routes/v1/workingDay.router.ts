import express from 'express';
import { workingDayController } from '../../controllers';
import catchAsync from '../../utils/catchAsync';
import { authenticate, authorize } from '../../middlewares/auth';

const router = express.Router();

// only for doctors
router.use(authenticate);
router.use(authorize(['doctor']));

router.route('/')
  .post(catchAsync(workingDayController.create))
  .get(catchAsync(workingDayController.get));

export default router;
