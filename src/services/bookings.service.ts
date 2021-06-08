import { Booking, WorkingDayInterface, CreateBookingProps } from '../models';

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
    const { timeTo, timeFrom } = getTimeToFromInSeconds(day.to, day.from);

    let slotTime = day.duration ?? 0;

    if (day.slots) {
      slotTime = Math.floor((timeTo - timeFrom) / day.slots);
    }

    const slots = Math.floor((timeTo - timeFrom) / slotTime);

    for (let i = 0; i < slots; i += 1) {
      const startTime = timeFrom + i * slotTime;
      const time = new Date(startTime * 1000).toISOString().substr(11, 8);
      bookings.push({ time, workingDayId: day.id });
    }
  });

  const booking = await Booking.db
    .returning('*')
    .insert(bookings);

  return booking[0];
};

const bookingService = {
  create,
};

export default bookingService;
