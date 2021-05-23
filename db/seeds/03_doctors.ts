import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('doctors').del();

  // Inserts seed entries
  await knex('doctors').insert([
    {
      userId: 3,
    },
  ]);
}
