import { Knex } from 'knex';

import ContactUs from '../../src/models/contactUs.model';

export async function up(knex: Knex): Promise<void> {
  return ContactUs.createTable(knex);
}

export async function down(knex: Knex): Promise<void> {
  return ContactUs.dropTable(knex);
}
