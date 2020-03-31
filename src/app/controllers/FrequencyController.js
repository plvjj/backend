import Frequency from '../models/Frequency';

class FrequencyController {
  async index(req, res) {
    const frequency = await Frequency.findAll();

    return res.json(frequency);
  }

  async store(req, res) {
    await Frequency.bulkCreate(req.body);

    return res.json({ ok: true });
  }
}

export default new FrequencyController();
