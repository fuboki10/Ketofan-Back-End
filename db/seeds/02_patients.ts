import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('patients').del();

  // Inserts seed entries
  await knex('patients').insert([
    {
      userId: 4,
    },
  ]);
}
