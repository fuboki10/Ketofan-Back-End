/* eslint-disable no-await-in-loop */
import { Knex } from 'knex';
import { workingDayService } from '../../src/services';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('doctors').del();

  const doctorData = [
    {
      userId: 3, bio: 'good doctor',
    },
    {
      userId: 5, bio: 'good doctor',
    },
    {
      userId: 6, bio: 'good doctor',
    },
    {
      userId: 7, bio: 'good doctor',
    },
    {
      userId: 8, bio: 'good doctor',
    },
    {
      userId: 9, bio: 'good doctor',
    },
  ];

  // Inserts seed entries
  await knex('doctors').insert(doctorData);

  // insert working days
  const workingDays :any = {
    type: 'reservation',
    days: [
      {
        day: 'Wednesday',
        from: '00:00:00',
        to: '12:00:00',
        duration: 60,
        slots: 12,
      },
    ],
  };
  for (let i = 0; i < doctorData.length; i += 1) {
    await workingDayService.create(i + 1, workingDays);
  }
}
