import status from 'http-status';
import { CreateAppointmentProps } from '../models';
import AppError from '../utils/AppError';
import knex from '../../db';

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAY_IN_MS = 86400000;

export const create = async (
  appointmentProps : CreateAppointmentProps, patient: string, doctor: string,
) => knex.transaction(
  async (trx) => {
    // get the booking
    const booking : any = await trx('bookings')
      .select(['bookings.*', 'working_days.day'])
      .where('bookings.id', '=', appointmentProps.bookingId)
      .join('working_days', 'working_days.id', '=', 'bookings.workingDayId');

    // check if it is not founds
    if (!booking || !booking[0]) {
      throw new AppError('Booking with the given id is not found', status.NOT_FOUND);
    }

    // check if it is available
    if (!booking[0].available || !booking[0].day) {
      throw new AppError('Booking with the given id is not available', status.FORBIDDEN);
    }

    // get today
    const today = (new Date()).getDay();

    const appointmentDay = weekDays.indexOf(booking[0].day);

    const n = weekDays.length;
    const dayDiff = (((appointmentDay - today) % n) + n) % n;

    // get the appointment date
    const date = new Date(new Date().getTime() + (dayDiff * DAY_IN_MS));

    const [h, m, s] = booking[0].time.split(':');

    date.setHours(h);
    date.setMinutes(m);
    date.setSeconds(s);

    // insert and update available booking to false
    const [appointment] : any = await Promise.all([
      trx('appointments')
        .returning('*')
        .insert({ ...appointmentProps, date }),

      trx('bookings')
        .where({ id: appointmentProps.bookingId })
        .update({ available: false }),
    ]);

    const res = {
      ...(appointment[0]),
      day: booking[0].day,
      time: booking[0].time,
      patient,
      doctor,
    };

    return res;
  },
);

const appointmentService = {
  create,
};

export default appointmentService;
