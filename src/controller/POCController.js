const POC = require('../model/POC');
const { decrypt } = require('../../services/CryptoService');

class POCController {
  static async post(req, res) {

    const { EncryptedBody } = req.body;

    const { ProcessId, BatchId, BatchQnt, ScrapQnt, PartNumber, Movement, OperatorEDV, Interditated } = decrypt(EncryptedBody);
    
    if (!ProcessId || !BatchId || !BatchQnt || !PartNumber || !Movement || !OperatorEDV) {
      return res.status(400).send({ message: 'Os campos não podem estar vazios.' });
    }

    try {
      const newPOC = await POC.create(ProcessId, BatchId, BatchQnt, ScrapQnt, PartNumber, Movement, OperatorEDV, Interditated);
      res.status(201).send( {message: 'POC criada com sucesso.'} );
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
        return res.status(404).send({ message: 'POC não encontrada.' });
      }
      res.status(200).send(poc);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async updateById(req, res) {
    const { EncryptedBody } = req.body;

    const { id, ProcessId, BatchId, BatchQnt, ScrapQnt, PartNumber, Movement, EDV, Interditated } = decrypt(EncryptedBody)

    try {
      const poc = await POC.findById(id);
      if (!poc) {
        return res.status(404).send({ message: 'POC não encontrada.' });
      }

      console.log(decrypt(EncryptedBody))
      const update = await POC.updateById(id, { ProcessId, BatchId, BatchQnt, ScrapQnt, PartNumber, Movement, EDV, Interditated })
      if (!update)
        throw new Error('Algo deu errado na atualização. Tente novamente.')

      res.status(200).send({ success: true, message: "POC atualizada com sucesso."});
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async deleteById(req, res) {
    try {
      const deletedPOC = await POC.deleteById(req.params.id);
      if (!deletedPOC) {
        return res.status(404).send({ message: 'POC não encontrada.' });
      }
      res.status(200).send({ message: 'POC removida com sucesso.' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async deleteAll(req, res) {
    try {
      await POC.deleteAll();
      res.status(200).send({ message: 'Todas as POCs foram removidas.' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }
}

module.exports = POCController;
