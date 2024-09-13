const POC = require('../model/POC');
const { decrypt } = require('../../services/CryptoService');

class POCController {
  static async post(req, res) {

    const { EncryptedBody } = req.body;

    const { ProcessId, BatchId, BatchQnt, ScrapQnt, PartNumber, Movement, OperatorEDV, Interditated } = decrypt(EncryptedBody);
    
    if (!ProcessId || !BatchId || !BatchQnt || !PartNumber || !Movement || !OperatorEDV) {
      return res.status(400).send({ message: 'Fields cannot be empty' });
    }

    try {
      const newPOC = await POC.create(ProcessId, BatchId, BatchQnt, ScrapQnt, PartNumber, Movement, OperatorEDV, Interditated);
      res.status(201).send( {message: 'Poc Created Succesfully'} );
    } catch (err) {
      console.error(err);
      res.status(400).send({ message: err.message });
    }
  }

  static async get(req, res) {
    try {
      const allPOCs = await POC.findAll();
      res.status(200).send(allPOCs);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async getById(req, res) {
    try {
      console.log(req.params.id)
      const poc = await POC.findById(req.params.id);
      if (!poc) {
        return res.status(404).send({ message: 'POC not found' });
      }
      res.status(200).send(poc);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async updateById(req, res) {
    const { EncryptedBody } = req.body;

    const { id, ProcessId, BatchId, BatchQnt, ScrapQnt, PartNumber, Movement, OperatorEDV, Interditated } = decrypt(EncryptedBody)

    try {
      const user = await POC.findById(id);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      const update = await POC.updateById(id, { ProcessId, BatchId, BatchQnt, ScrapQnt, PartNumber, Movement, OperatorEDV, Interditated })
      if (!update)
        throw new Error('Somethin went wrong when updating')

      res.status(200).send({ success: true, message: "POC updated succesfully"});
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async deleteById(req, res) {
    try {
      const deletedPOC = await POC.deleteById(req.params.id);
      if (!deletedPOC) {
        return res.status(404).send({ message: 'POC not found' });
      }
      res.status(200).send({ message: 'POC deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async deleteAll(req, res) {
    try {
      await POC.deleteAll();
      res.status(200).send({ message: 'All POCs deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }
}

module.exports = POCController;
