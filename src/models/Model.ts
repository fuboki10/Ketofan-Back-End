import { Knex } from 'knex';
// eslint-disable-next-line import/extensions
import db from '../../db';

/**
 * @interface
 * @author Abdelrahman Tarek
 */
export interface SchemaInterface {
  // eslint-disable-next-line no-unused-vars
  (table : Knex.CreateTableBuilder) : void
}

/**
 * @interface
 * @param {String} name
 * @author Abdelrahman Tarek
 */
export interface ModelProps {
  /**
   * Model Name
   * @type {String}
   */
  name: string;

  /**
   * Model Name
   * @type {SchemaInterface}
   */
  schema: SchemaInterface;
}

/**
 * @class
 * @author Abdelrahman Tarek
 */
export default class Model {
  name: string;

  db : Knex.QueryBuilder;

  // eslint-disable-next-line no-unused-vars
  schema: SchemaInterface;

  /**
   * @constructor
   * @author Abdelrahman Tarek
   * @param {ModelProps} props
   */
  constructor(props : ModelProps) {
    this.name = props.name;
    this.db = db(this.name);
    this.schema = props.schema;
  }

  find() : Knex.QueryBuilder {
    return this.db;
  }

  findById(id : number) : Knex.QueryBuilder {
    return this.db
      .where('id', id);
  }

  removeById(id : number) : Knex.QueryBuilder {
    return this.db
      .where('id', id)
      .del();
  }

  dropTable(knex : Knex) : Knex.SchemaBuilder {
    return knex.schema.dropTableIfExists(this.name);
  }

  createTable(knex : Knex) : Knex.SchemaBuilder {
    return knex.schema.createTable(this.name, this.schema);
  }
}
