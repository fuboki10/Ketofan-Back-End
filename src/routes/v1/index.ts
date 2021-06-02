/* eslint-disable import/extensions */
import express from 'express';
import authRouter from './auth.router';
import verifyRouter from './verify.router';
import specializationRouter from './specialization.route';
import contactUsRouter from './contactUs.router';

const router = express.Router();

// Add routes
router.use('/auth', authRouter);
router.use('/verify', verifyRouter);
router.use('/specializations', specializationRouter);
router.use('/contactUs', contactUsRouter);

export default router;
