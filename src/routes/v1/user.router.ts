import express from 'express';
import { authenticate } from '../../middlewares/auth';
import { userController } from '../../controllers';

const router = express.Router();

router.route('/me').get(authenticate, userController.me);

export default router;
