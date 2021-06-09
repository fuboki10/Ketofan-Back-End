import {
  Booking, WorkingDay, WorkingDayInterface, CreateBookingProps, BookingInterface,
} from '../models';

const getTimeToFromInSeconds = (to : Date, from : Date) => {
  let [h, m, s] = to.toString().split(':').map((v) => parseInt(v, 10));
  const timeTo = h * (60 * 60) + m * 60 + s;
  [h, m, s] = from.toString().split(':').map((v) => parseInt(v, 10));
  const timeFrom = h * (60 * 60) + m * 60 + s;

  return { timeTo, timeFrom };
};

export const create = async (workingDays : WorkingDayInterface[]) => {
  const bookings : CreateBookingProps[] = [];

  workingDays.forEach((day) => {
    if (!day.working) return;

    const { timeTo, timeFrom } = getTimeToFromInSeconds(day.to, day.from);

    let slotTime = 0;
    let slots = 1;

    if (day.type === 'reservation' && day.duration) {
      slotTime = day.duration * 60;
      slots = Math.floor((timeTo - timeFrom) / slotTime);
    }

    if (day.type === 'fifo' && day.slots) {
      slots = day.slots;
      slotTime = Math.floor((timeTo - timeFrom) / day.slots);
    }

    for (let i = 0; i < slots; i += 1) {
      const startTime = timeFrom + i * slotTime;
      const time = new Date(startTime * 1000).toISOString().substr(11, 8);
      bookings.push({ time, workingDayId: day.id });
    }
  });

  if (bookings.length < 1) return [];

  const booking = await Booking.db
    .returning('*')
    .insert(bookings);

  return booking[0];
};

export const get = async (doctorId: number) => {
  const bookings : BookingInterface[] = await WorkingDay.db
    .select(['bookings.*', 'working_days.day'])
    .where('working_days.doctorId', '=', doctorId)
    .join('bookings', 'bookings.workingDayId', '=', 'working_days.id')
    .orderBy('bookings.time', 'asc');

  const res: any = {};

  bookings.forEach((booking) => {
    if (!booking.day) return;

    if (!res[booking.day]) {
      res[booking.day] = [];
    }
    res[booking.day].push({ time: booking.time, id: booking.id, available: booking.available });
  });

  return res;
};

const bookingService = {
  create,
  get,
};

export default bookingService;
