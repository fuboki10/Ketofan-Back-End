/* eslint-disable import/extensions */
import express from 'express';
import authRouter from './auth.router';

const router = express.Router();

// Add routes
router.use('/auth', authRouter);

export default router;
