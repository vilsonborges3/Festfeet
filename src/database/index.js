import Sequelize from 'sequelize';

import User from '../app/models/User';

import Recipients from '../app/models/recipient';

import databaseConfig from '../config/database';
import Recipient from '../app/models/recipient';

const models = [User, Recipient];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
