/* eslint-disable import/extensions */
import express from 'express';
import authRouter from './auth.router';
import verifyRouter from './verify.router';
import specializationRouter from './specialization.route';

const router = express.Router();

// Add routes
router.use('/auth', authRouter);
router.use('/verify', verifyRouter);
router.use('/specializations', specializationRouter);

export default router;
