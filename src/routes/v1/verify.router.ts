import express from 'express';
import { verifyController } from '../../controllers';
import catchAsync from '../../utils/catchAsync';

const router = express.Router();

router.route('/:token')
  .get(catchAsync(verifyController.verify));

export default router;
