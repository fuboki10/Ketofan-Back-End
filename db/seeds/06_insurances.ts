import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('insurances').del();

  // Inserts seed entries
  await knex('insurances').insert([
    { name: '1' },
    { name: '2' },
    { name: '3' },
  ]);
}
