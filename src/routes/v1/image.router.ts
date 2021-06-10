import express from 'express';
import { imageController } from '../../controllers';
import catchAsync from '../../utils/catchAsync';

const router = express.Router();

router.route('/:id')
  .get(catchAsync(imageController.getById));

export default router;
