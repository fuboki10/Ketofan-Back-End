import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('insurances').del();

  // Inserts seed entries
  await knex('insurances').insert([
    { name: 'Engineers Syndicate' },
    { name: 'Lawyers Syndicate' },
    { name: 'Agricultural Syndicate' },
    { name: 'Unicare' },
    { name: 'Egycare' },
    { name: 'Metlife Alico' },
    { name: 'Unicare' },
    { name: 'Prime Health' },
    { name: 'Access' },
    { name: 'Active Company' },
    { name: 'Air Cairo' },
    { name: 'Allied Doctors' },
    { name: 'Alfa Care' },
    { name: 'Al Mashreq' },
    { name: 'AMIS' },
    { name: 'Banque Misr' },
    { name: 'Banque du Caire' },
    { name: 'Caregas' },
    { name: 'CarePlus' },
    { name: 'City Care' },
  ]);
}
