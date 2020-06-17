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
    console.log('teste');
    const { recipint } = await Recipient.create(req.body);
    console.log('teste3');
    console.log(recipint);
    return res.json(recipint);
  }
}

export default new UserController();
