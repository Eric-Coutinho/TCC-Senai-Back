const PartNr = require('../model/PartNr');
const { decrypt } = require("../../services/CryptoService");

class PartNumberController {
  static async post(req, res) {
    const { EncryptedBody } = req.body;

    const { PartNumber } = decrypt(EncryptedBody);

    if (!PartNumber) {
      return res.status(400).send({ message: 'Os campos não podem estar vazios.' });
    }

    try {
      const newUser = await PartNr.create(PartNumber);
      if (!newUser)
        throw new Error('Algo deu errado na criação. Tente novamente.');
      

      res.status(201).send({ message: 'PartNumber criado com sucesso.' });
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
      const partNr = await PartNr.findById(req.params.partnumber);
      if (!partNr) {
        return res.status(404).send({ message: 'PartNumber não encontrado.' });
      }
      res.status(200).send(partNr);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async updateById(req, res) {
    const { PartNumber } = req.body;

    try {
      const partNr = await partNr.findById(PartNumber);
      if (partNr) {
        return res.status(404).send({ message: 'PartNumber não encontrado.' });
      }

      await PartNr.updateById(PartNumber, { PartNumber })
      res.status(200).send({ succes: true, message: "PartNumber atualizado com sucesso."});
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async deleteById(req, res) {
    try {
      const partNr = await PartNr.deleteById(req.params.partnumber);
      if (!partNr) {
        return res.status(404).send({ message: 'PartNumber não encontrado.' });
      }
      res.status(200).send({ message: 'PartNumber removido com sucesso.' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async deleteAll(req, res) {
    try {
      await PartNr.deleteAll();
      res.status(200).send({ message: 'Todos os PartNumbers foram removidos.' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }
}

module.exports = PartNumberController;
