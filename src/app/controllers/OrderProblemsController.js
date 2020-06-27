import ProblemOrder from '../models/ProblemOrder';

class OrderProblemsController {
  async index(req, res) {
    return res.json('teste');
  }

  async store(req, res) {
    const { description, delivery_id } = req.body;

    try {
      const problem = await ProblemOrder.create({
        description,
        delivery_id,
      });

      return res.json(problem);
    } catch (err) {
      return res.json(err);
    }
  }
}

export default new OrderProblemsController();
