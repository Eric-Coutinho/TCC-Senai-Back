const POC = require('../model/POC');

class POCController {
  static async post(req, res) {
    const { ProcessId, BatchId, BatchQnt, ScrapQnt, PartNumber, Movement, OperatorEDV, Interditated } = req.body;
    console.log(req.body)
    if (!ProcessId || !BatchId || !BatchQnt || !PartNumber || !Movement || !OperatorEDV || !Interditated) {
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
