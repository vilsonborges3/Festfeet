import { Op } from 'sequelize';
import { getHours, getDay, differenceInHours } from 'date-fns';
import Delivers from '../models/Delivers';
import Order from '../models/Order';
import Recipient from '../models/recipient';

class OrdersController {
  async index(req, res) {
    const orders = await Order.findAll({
      where: { end_date: null },
    });
    return res.json(orders);
  }

  async store(req, res) {
    const { product, deliverman_email, recipient_name } = req.body;
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

    if (!deliveryman_id) {
      return res.status(400).json({ error: 'deliveryman does not found' });
    }

    const { id: recipient_id } = await Recipient.findOne({
      where: {
        name: recipient_name,
      },
    });

    if (!recipient_id) {
      return res.status(400).json({ error: 'recipient does not found' });
    }

    const order = await Order.create({
      product,
      deliveryman_id,
      recipient_id,
    });

    return res.json(order);
  }

  async show(req, res) {
    const { id } = req.params;

    const start_date = new Date();

    const hour = getHours(start_date);

    const difference = differenceInHours(0, Number(hour));

    if (difference <= 24) {
      console.log(difference);
    }

    if (!(hour >= 8 && hour < 18)) {
      return res.status(400).json({ error: "It's not time to pick up" });
    }

    const order = await Order.findByPk(id);

    const newOrder = await order.update({
      start_date,
    });

    return res.json(newOrder);
  }

  async completed(req, res) {
    const { id } = req.params;

    const end_date = new Date();

    const order = await Order.findByPk(id);

    const newOrder = await order.update({
      end_date,
    });

    return res.json(newOrder);
  }

  async update(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    const newOrder = await order.update(req.body);

    return res.json(newOrder);
  }

  async delete(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    const cancelated_at = new Date();

    const newOrder = await order.update({ cancelated_at });

    return res.json(newOrder);
  }

  async deliverymanList(req, res) {
    const { id } = req.params;

    const orders = await Order.findAll({
      where: {
        deliveryman_id: id,
      },
    });

    return res.json(orders);
  }
}

export default new OrdersController();
