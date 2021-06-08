import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('images').del();

  // Inserts seed entries
  await knex('images').insert([
    {
      filename: 'p1.jpg', filepath: 'public/images/p1.jpg', mimetype: 'image/jpeg', size: 18021,
    },
  ]);
}
