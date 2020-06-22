import Sequelize, { Model } from 'sequelize';
import Delivers from './Delivers';
import Recipient from './recipient';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        cancelated_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Delivers, { foreignKey: 'deliveryman_id' });
    this.belongsTo(models.Recipient, { foreignKey: 'recipient_id' });
  }
}

export default Order;
