import { Knex } from 'knex';
import hashPassword from '../../src/services/helpers/hashPassword';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  const hashedPassword = await hashPassword('12341234');

  // Inserts seed entries
  await knex('users').insert([
    {
      role: 'super_admin', password: hashedPassword, email: 'admin1@gmail.com', gender: 'M', name: 'Arafat', dateOfBirth: '1999-10-20', mobileNumber: '01128745555', profileImage: 3,
    },
    {
      role: 'admin', password: hashedPassword, email: 'admin2@gmail.com', gender: 'M', name: 'admin', dateOfBirth: '1999-10-20', mobileNumber: '01128745554', profileImage: 2,
    },
    {
      role: 'doctor', password: hashedPassword, email: 'doctor1@gmail.com', gender: 'M', name: 'Abdelrahman Arafat', dateOfBirth: '1999-10-20', mobileNumber: '01128745553', profileImage: 3,
    },
    {
      role: 'patient', password: hashedPassword, email: 'patient1@gmail.com', gender: 'M', name: 'Ali', dateOfBirth: '1999-10-20', mobileNumber: '01128745552', profileImage: 4,
    },
    {
      role: 'doctor', password: hashedPassword, email: 'doctor2@gmail.com', gender: 'M', name: 'Ahmed Walid', dateOfBirth: '1999-10-20', mobileNumber: '01128745551', profileImage: 6,
    },
    {
      role: 'doctor', password: hashedPassword, email: 'doctor3@gmail.com', gender: 'M', name: 'Hassan M. Ibrahim', dateOfBirth: '1999-10-20', mobileNumber: '01128745550', profileImage: 7,
    },
    {
      role: 'doctor', password: hashedPassword, email: 'doctor4@gmail.com', gender: 'M', name: 'Tarek', dateOfBirth: '1999-10-20', mobileNumber: '01128745549', profileImage: 8,
    },
    {
      role: 'doctor', password: hashedPassword, email: 'doctor5@gmail.com', gender: 'M', name: 'Ali', dateOfBirth: '1999-10-20', mobileNumber: '01128745548', profileImage: 4,
    },
    {
      role: 'doctor', password: hashedPassword, email: 'doctor6@gmail.com', gender: 'M', name: 'Lido', dateOfBirth: '1999-10-20', mobileNumber: '01128745547', profileImage: 5,
    },
  ]);
}
