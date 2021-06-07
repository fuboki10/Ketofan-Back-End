/* eslint-disable import/extensions */
import express from 'express';
import authRouter from './auth.router';
import verifyRouter from './verify.router';
import specializationRouter from './specialization.router';
import contactUsRouter from './contactUs.router';
import areaRouter from './area.router';
import insuranceRouter from './insurance.router';
import doctorRouter from './doctor.router';
import imageRouter from './image.router';
import userRouter from './user.router';
import workingDayRouter from './workingDay.router';

const router = express.Router();

// Add routes
router.use('/auth', authRouter);
router.use('/verify', verifyRouter);
router.use('/specializations', specializationRouter);
router.use('/contactUs', contactUsRouter);
router.use('/areas', areaRouter);
router.use('/insurances', insuranceRouter);
router.use('/doctors', doctorRouter);
router.use('/images', imageRouter);
router.use('/users', userRouter);
router.use('/workingDays', workingDayRouter);

export default router;
