import Signature from '../models/Signature';

class SignatureController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const { id: signature_id } = await Signature.create({
      name,
      path,
    });

    return res.json(signature_id);
  }
}

export default new SignatureController();
