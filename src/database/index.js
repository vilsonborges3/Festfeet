import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import Order from '../app/models/Order';
import Signature from '../app/models/Signature';
import ProblemOrder from '../app/models/ProblemOrder';

import Recipient from '../app/models/recipient';
import Delivers from '../app/models/Delivers';

import databaseConfig from '../config/database';

const models = [
  User,
  Recipient,
  Delivers,
  File,
  Order,
  Signature,
  ProblemOrder,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
