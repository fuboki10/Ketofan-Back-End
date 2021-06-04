import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('areas').del();

  // Inserts seed entries
  await knex('areas').insert([
    { name: 'cairo' },
    { name: 'giza' },
    { name: 'luxor' },
  ]);
}
