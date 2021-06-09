import status from 'http-status';
import {
  Appointment, CreateAppointmentProps, DoctorInterface, PatientInterface,
} from '../models';
import AppError from '../utils/AppError';
import knex from '../../db';

const selectList = [
  'appointments.*',
  'bookings.time as time',
  'working_days.day as day',
];

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

export const getDoctorAppointments = async (
  props :{doctor: DoctorInterface, limit : number, offset : number},
) => {
  const { doctor, limit, offset } = props;

  const [appointments, total] : any = await Promise.all([
    Appointment.db
      .select([...selectList, 'users.name as patient'])
      .where('appointments.doctorId', '=', doctor.id)
      .join('bookings', 'bookings.id', '=', 'appointments.bookingId')
      .join('working_days', 'working_days.id', '=', 'bookings.workingDayId')
      .join('patients', 'patients.id', '=', 'appointments.patientId')
      .join('users', 'users.id', '=', 'patients.userId')
      .offset(offset)
      .limit(limit),

    Appointment.db.where({ doctorId: doctor.id }).count(),
  ]);

  return { appointments, total: parseInt(total[0].count, 10) };
};

export const getPatientAppointments = async (
  props :{patient: PatientInterface, limit : number, offset : number},
) => {
  const { patient, limit, offset } = props;

  const [appointments, total] : any = await Promise.all([
    Appointment.db
      .select([...selectList, 'users.name as doctor'])
      .where('appointments.patientId', '=', patient.id)
      .join('bookings', 'bookings.id', '=', 'appointments.bookingId')
      .join('working_days', 'working_days.id', '=', 'bookings.workingDayId')
      .join('doctors', 'doctors.id', '=', 'appointments.doctorId')
      .join('users', 'users.id', '=', 'doctors.userId')
      .offset(offset)
      .limit(limit),

    Appointment.db.where({ patientId: patient.id }).count(),
  ]);

  return { appointments, total: parseInt(total[0].count, 10) };
};

export const remove = async (id:number) => {
  const appointment : any = await Appointment.db
    .returning('*')
    .delete()
    .where({ id });

  if (!appointment || !appointment[0]) { throw new AppError('Appointment with the given id is not found', status.NOT_FOUND); }

  return appointment[0];
};

const appointmentService = {
  create,
  getDoctorAppointments,
  getPatientAppointments,
  remove,
};

export default appointmentService;
