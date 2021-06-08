import express from 'express';
import { areaController } from '../../controllers';
import catchAsync from '../../utils/catchAsync';

const router = express.Router();

router
  .route('/')
  .get(catchAsync(areaController.create));

export default router;
