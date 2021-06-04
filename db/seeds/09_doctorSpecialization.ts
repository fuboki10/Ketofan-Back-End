import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('doctor_specializations').del();

  // Inserts seed entries
  await knex('doctor_specializations').insert([
    { doctorId: 1, specializationId: 1 },
    { doctorId: 2, specializationId: 2 },
    { doctorId: 3, specializationId: 3 },
    { doctorId: 4, specializationId: 1 },
    { doctorId: 5, specializationId: 2 },
    { doctorId: 6, specializationId: 3 },
  ]);
}
