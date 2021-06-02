/* eslint-disable import/extensions */
import express from 'express';
import authRouter from './auth.router';
import verifyRouter from './verify.router';
import specializationRouter from './specialization.router';
import contactUsRouter from './contactUs.router';
import areaRouter from './area.router';
import insuranceRouter from './insurance.router';

const router = express.Router();

// Add routes
router.use('/auth', authRouter);
router.use('/verify', verifyRouter);
router.use('/specializations', specializationRouter);
router.use('/contactUs', contactUsRouter);
router.use('/areas', areaRouter);
router.use('/insurances', insuranceRouter);

export default router;
