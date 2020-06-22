import Delivers from '../models/Delivers';
import File from '../models/File';

class DeliversCotrolers {
  async createDelivers(req, res) {
    const deliverExists = await Delivers.findOne({
      where: { email: req.body.email },
    });

    if (deliverExists) {
      return res.status(400).json({ error: 'deliver already exists.' });
    }

    const { id, name, email } = await Delivers.create(req.body);

    return res.json({ id, name, email });
  }

  async index(req, res) {
    const delivers = await Delivers.findAll({
      attributes: ['id', 'name', 'avatar_id', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(delivers);
  }

  async update(req, res) {
    const deliver = await Delivers.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!deliver) {
      return res.status(400).json({ error: 'Deliver does not found' });
    }

    const newDeliver = await deliver.update(req.body);

    return res.json(newDeliver);
  }

  async remove(req, res) {
    const deliver = await Delivers.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!deliver) {
      return res.status(400).json({ error: 'Deliver does not found' });
    }

    const removed = await Delivers.destroy({
      where: {
        email: req.body.email,
      },
    });

    return res.json(removed);
  }
}

export default new DeliversCotrolers();
