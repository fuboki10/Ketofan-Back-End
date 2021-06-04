import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('doctor_insurances').del();

  // Inserts seed entries
  await knex('doctor_insurances').insert([
    { doctorId: 1, insuranceId: 1 },
    { doctorId: 2, insuranceId: 2 },
    { doctorId: 3, insuranceId: 3 },
    { doctorId: 4, insuranceId: 1 },
    { doctorId: 5, insuranceId: 2 },
    { doctorId: 6, insuranceId: 3 },
  ]);
}
