import { Knex } from 'knex';
// eslint-disable-next-line import/extensions
import dbConn from '../../db';

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

  // eslint-disable-next-line no-unused-vars
  schema: SchemaInterface;

  /**
   * @constructor
   * @author Abdelrahman Tarek
   * @param {ModelProps} props
   */
  constructor(props : ModelProps) {
    this.name = props.name;
    this.schema = props.schema;
  }

  get db() {
    return dbConn(this.name);
  }

  public find(filters : Object = {}) : Knex.QueryBuilder {
    return this.db
      .where(filters);
  }

  public findOne(filters : Object = {}) : Knex.QueryBuilder {
    return this.db
      .where(filters)
      .limit(1);
  }

  public findById(id : string) : Knex.QueryBuilder {
    return this.db
      .where('id', id);
  }

  public removeById(id : string) : Knex.QueryBuilder {
    return this.db
      .where('id', id)
      .del();
  }

  public dropTable(knex : Knex) : Knex.SchemaBuilder {
    return knex.schema.dropTableIfExists(this.name);
  }

  public createTable(knex : Knex) : Knex.SchemaBuilder {
    return knex.schema.createTable(this.name, this.schema);
  }
}
