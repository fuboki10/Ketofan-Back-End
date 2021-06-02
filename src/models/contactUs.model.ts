/* eslint-disable camelcase */
import { Knex } from 'knex';
import ModelBuilder from './ModelBuilder';
import { SchemaInterface } from './Model';

export interface ContactUsInterface {
  id: string;
  name: string;
  mobileNumber: string;
  email: string;
  comments: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateContactUsProps {
  id?: string;
  name: string;
  mobileNumber: string;
  email: string;
  comments: string;
}

const schema : SchemaInterface = (table : Knex.CreateTableBuilder) => {
  table.increments('id').primary().notNullable();

  table.string('name').notNullable();
  table.string('mobileNumber').notNullable();
  table.string('email').notNullable();
  table.text('comments').notNullable();

  table.timestamps(true, true);
};

const ContactUs = ModelBuilder.build('contact_us', schema);

export default ContactUs;
