import { Knex } from 'knex';
import { authService } from '../../src/services';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  const hashedPassword = await authService.hashPassword('12341234');

  // Inserts seed entries
  await knex('users').insert([
    {
      id: 1, username: 'admin1', role: 'super_admin', password: hashedPassword, email: 'admin1@gmail.com',
    },
    {
      id: 2, username: 'admin2', role: 'admin', password: hashedPassword, email: 'admin2@gmail.com',
    },
    {
      id: 3, username: 'doctor1', role: 'doctor', password: hashedPassword, email: 'doctor1@gmail.com',
    },
    {
      id: 4, username: 'patient1', role: 'patient', password: hashedPassword, email: 'patient1@gmail.com',
    },
  ]);
}
