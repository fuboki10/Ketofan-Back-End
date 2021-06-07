import express from 'express';
import { imageController } from '../../controllers';
import catchAsync from '../../utils/catchAsync';
import { commonValidator } from '../../validations';

const router = express.Router();

router.route('/:id')
  .get(commonValidator.id, catchAsync(imageController.getById));

export default router;
