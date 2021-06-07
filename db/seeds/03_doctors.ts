import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('doctors').del();

  // Inserts seed entries
  await knex('doctors').insert([
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
  ]);
}
