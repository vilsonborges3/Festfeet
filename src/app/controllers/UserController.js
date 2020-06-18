import User from '../models/User';
import Recipient from '../models/recipient';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async createRecipients(req, res) {
    const { recipint } = await Recipient.create(req.body);
    return res.json(recipint);
  }

  async updateRecipients(req, res) {
    const { name } = req.body;

    const recipientFound = await Recipient.findOne({ where: { name } });

    if (!recipientFound) {
      return res.status(400).json({ error: 'Recipient not registered' });
    }

    const recp = await recipientFound.update(req.body);

    return res.json(recp);
  }
}

export default new UserController();
