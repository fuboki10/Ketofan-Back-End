import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('specializations').del();

  // Inserts seed entries
  await knex('specializations').insert([
    { name: 'ear, nose and throat' },
    { name: 'orthopedics' },
    { name: 'dentistry' },
  ]);
}
