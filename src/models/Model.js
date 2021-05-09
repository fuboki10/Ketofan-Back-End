const db = require('../../db/db');

class Model {
  constructor(props) {
    this.name = props.name;
    this.db = db(this.name);
  }

  find() {
    return this.db;
  }

  findById(id) {
    return this.db
      .where('id', id);
  }

  removeById(id) {
    return this.db
      .where('id', id)
      .del();
  }
}

module.exports = Model;
