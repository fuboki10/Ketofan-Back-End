import { Knex } from 'knex';

import VerifyToken from '../../src/models/verifyToken.model';

export async function up(knex: Knex): Promise<void> {
  return VerifyToken.createTable(knex);
}

export async function down(knex: Knex): Promise<void> {
  return VerifyToken.dropTable(knex);
}
