import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('areas').del();

  // Inserts seed entries
  await knex('areas').insert([
    { name: 'Cairo' },
    { name: 'Gize' },
    { name: 'Alexandria' },
    { name: 'North Coast' },
    { name: 'Qalyubia' },
    { name: 'Gharbia' },
    { name: 'Menofia' },
    { name: 'Fayoum' },
    { name: 'El-Dakahlia' },
    { name: 'El-Sharqia' },
    { name: 'El-Beheira' },
    { name: 'Damietta' },
    { name: 'Matrouh' },
    { name: 'Assiut' },
    { name: 'El-Ismalia' },
    { name: 'Hurghada' },
    { name: 'Sharm El Sheikh' },
    { name: 'Portsaid' },
    { name: 'Suez' },
    { name: 'Sohag' },
    { name: 'El-Minia' },
    { name: 'Kafr El Shikh' },
    { name: 'Luxor' },
    { name: 'Qena' },
    { name: 'Beni Suef' },
  ]);
}
