import Delivers from '../models/Delivers';

class DeliversCotrolers {
  async createDelivers(req, res) {
    const userExists = await Delivers.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email } = await Delivers.create(req.body);

    return res.json({ id, name, email });
  }
}

export default new DeliversCotrolers();
