const PartNr = require('../model/PartNr');
const { decrypt } = require("../../services/CryptoService");

class PartNumberController {
  static async post(req, res) {
    const { EncryptedBody } = req.body;

    const { id } = decrypt(EncryptedBody);

    if (!id) {
      return res.status(400).send({ message: 'Fields cannot be empty' });
    }

    try {
      const newUser = await PartNr.create(id);
      if (!newUser)
        throw new Error('Something went wrong when trying to create a Part Number');
      

      res.status(201).send({ message: 'Part Number Created Successfully' });
    } catch (err) {
      // console.log('cheguei')
      res.status(400).send({ message: err.message });
    }
  }

  static async get(req, res) {
    try {
      const allPartNrs = await PartNr.findAll();
      res.status(200).send(allPartNrs);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const partNr = await PartNr.findById(req.params.id);
      if (!partNr) {
        return res.status(404).send({ message: 'PartNumber not found' });
      }
      res.status(200).send(partNr);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async updateById(req, res) {
    const { id } = req.body;

    try {
      const partNr = await partNr.findById(id);
      if (partNr) {
        return res.status(404).send({ message: 'Part Number not found' });
      }

      await PartNr.updateById(id, { id })
      res.status(200).send({ succes: true, message: "Part Number updated succesfully"});
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async deleteById(req, res) {
    try {
      const partNr = await PartNr.deleteById(req.params.id);
      if (!partNr) {
        return res.status(404).send({ message: 'Part Number not found' });
      }
      res.status(200).send({ message: 'Part Number deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async deleteAll(req, res) {
    try {
      await PartNr.deleteAll();
      res.status(200).send({ message: 'All Part Numbers deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }
}

module.exports = PartNumberController;
