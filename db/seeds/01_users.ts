import { Knex } from 'knex';
import hashPassword from '../../src/services/helpers/hashPassword';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  const hashedPassword = await hashPassword('12341234');

  // Inserts seed entries
  await knex('users').insert([
    {
      role: 'super_admin', password: hashedPassword, email: 'admin1@gmail.com', gender: 'M', name: 'admin', dateOfBirth: '1999-10-20', mobileNumber: '01128745555', profileImage: 1,
    },
    {
      role: 'admin', password: hashedPassword, email: 'admin2@gmail.com', gender: 'M', name: 'admin', dateOfBirth: '1999-10-20', mobileNumber: '01128745554', profileImage: 1,
    },
    {
      role: 'doctor', password: hashedPassword, email: 'doctor1@gmail.com', gender: 'M', name: 'doctor', dateOfBirth: '1999-10-20', mobileNumber: '01128745553', profileImage: 1,
    },
    {
      role: 'patient', password: hashedPassword, email: 'patient1@gmail.com', gender: 'M', name: 'patient', dateOfBirth: '1999-10-20', mobileNumber: '01128745552', profileImage: 1,
    },
    {
      role: 'doctor', password: hashedPassword, email: 'doctor2@gmail.com', gender: 'M', name: 'ahmed walid', dateOfBirth: '1999-10-20', mobileNumber: '01128745551', profileImage: 1,
    },
    {
      role: 'doctor', password: hashedPassword, email: 'doctor3@gmail.com', gender: 'M', name: 'arafat', dateOfBirth: '1999-10-20', mobileNumber: '01128745550', profileImage: 1,
    },
    {
      role: 'doctor', password: hashedPassword, email: 'doctor4@gmail.com', gender: 'M', name: 'hassan', dateOfBirth: '1999-10-20', mobileNumber: '01128745549', profileImage: 1,
    },
    {
      role: 'doctor', password: hashedPassword, email: 'doctor5@gmail.com', gender: 'M', name: 'doctor mekawy', dateOfBirth: '1999-10-20', mobileNumber: '01128745548', profileImage: 1,
    },
    {
      role: 'doctor', password: hashedPassword, email: 'doctor6@gmail.com', gender: 'M', name: 'doctor6', dateOfBirth: '1999-10-20', mobileNumber: '01128745547', profileImage: 1,
    },
  ]);
}
