import express from 'express';
import appointmentRouter from './appointment.router';

const router = express.Router({ mergeParams: true });

router.use('/appointments', appointmentRouter);

export default router;
