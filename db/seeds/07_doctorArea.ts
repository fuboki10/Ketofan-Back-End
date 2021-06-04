import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('doctor_areas').del();

  // Inserts seed entries
  await knex('doctor_areas').insert([
    { doctorId: 1, areaId: 1 },
    { doctorId: 2, areaId: 2 },
    { doctorId: 3, areaId: 3 },
    { doctorId: 4, areaId: 1 },
    { doctorId: 5, areaId: 2 },
    { doctorId: 6, areaId: 3 },
  ]);
}
