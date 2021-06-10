import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('images').del();

  // Inserts seed entries
  await knex('images').insert([
    {
      filename: 'default.jpg', filepath: 'public/images/default.jpg', mimetype: 'image/jpeg', size: 16579,
    },
    {
      filename: 'p1.jpg', filepath: 'public/images/p1.jpg', mimetype: 'image/jpeg', size: 18021,
    },
    {
      filename: 'p2.jpg', filepath: 'public/images/p2.jpg', mimetype: 'image/jpeg', size: 18021,
    },
    {
      filename: 'p3.jpg', filepath: 'public/images/p3.jpg', mimetype: 'image/jpeg', size: 18021,
    },
    {
      filename: 'p4.jpg', filepath: 'public/images/p4.jpg', mimetype: 'image/jpeg', size: 18021,
    },
    {
      filename: 'p5.jpg', filepath: 'public/images/p5.jpg', mimetype: 'image/jpeg', size: 18021,
    },
    {
      filename: 'p6.jpg', filepath: 'public/images/p6.jpg', mimetype: 'image/jpeg', size: 18021,
    },
    {
      filename: 'p7.jpg', filepath: 'public/images/p7.jpg', mimetype: 'image/jpeg', size: 18021,
    },
  ]);
}
