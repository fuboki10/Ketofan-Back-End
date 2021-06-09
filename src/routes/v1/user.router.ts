import express from 'express';
import { authenticate } from '../../middlewares/auth';
import { userController } from '../../controllers';
import { userValidator } from '../../validations';
import catchAsync from '../../utils/catchAsync';
import imageUpload from '../../middlewares/imageUpload';

const router = express.Router();

router.route('/me/profileImage')
  .patch(
    authenticate,
    catchAsync(imageUpload.fields([{ name: 'profileImage', maxCount: 1 }])),
    catchAsync(userController.editProfileImage),
  );

router.route('/me/password')
  .patch(
    authenticate,
    userValidator.editPassword,
    catchAsync(userController.editPassword),
  );

router.route('/me')
  .get(authenticate, catchAsync(userController.me))
  .put(authenticate, userValidator.edit, catchAsync(userController.edit));

export default router;
