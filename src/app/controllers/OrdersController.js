import Delivers from '../models/Delivers';
import Order from '../models/Order';
import Recipient from '../models/recipient';

class OrdersController {
  async store(req, res) {
    const { product, deliverman_email, recipient_name } = req.body;
    console.log(product);
    if (!product) {
      return res.status(400).json({ error: 'product name were not found' });
    }

    if (!deliverman_email) {
      return res.status(400).json({ error: 'deliverman email were not found' });
    }

    if (!recipient_name) {
      return res.status(400).json({ error: 'recipient name were not found' });
    }

    const { id: deliveryman_id } = await Delivers.findOne({
      where: {
        email: deliverman_email,
      },
    });

    const { id: recipient_id } = await Recipient.findOne({
      where: {
        name: recipient_name,
      },
    });
    const start_date = new Date();

    const order = await Order.create({
      product,
      deliveryman_id,
      recipient_id,
      start_date,
    });

    return res.json(order);
  }
}

export default new OrdersController();
