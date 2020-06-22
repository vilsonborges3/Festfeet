import Sequelize from 'sequelize';

import User from '../app/models/User';

import Recipient from '../app/models/recipient';
import Delivers from '../app/models/Delivers';

import databaseConfig from '../config/database';

const models = [User, Recipient, Delivers];

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
