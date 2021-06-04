import { Knex } from 'knex';
import { authService } from '../../src/services';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  const hashedPassword = await authService.hashPassword('12341234');

  // Inserts seed entries
  await knex('users').insert([
    {
      role: 'super_admin', password: hashedPassword, email: 'admin1@gmail.com', gender: 'M', name: 'admin', dateOfBirth: '1999-10-20',
    },
    {
      role: 'admin', password: hashedPassword, email: 'admin2@gmail.com', gender: 'M', name: 'admin', dateOfBirth: '1999-10-20',
    },
    {
      role: 'doctor', password: hashedPassword, email: 'doctor1@gmail.com', gender: 'M', name: 'doctor', dateOfBirth: '1999-10-20',
    },
    {
      role: 'patient', password: hashedPassword, email: 'patient1@gmail.com', gender: 'M', name: 'patient', dateOfBirth: '1999-10-20',
    },
  ]);
}
