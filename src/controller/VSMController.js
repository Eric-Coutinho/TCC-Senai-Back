const VSM = require('../model/VSM');
const { decrypt } = require("../../services/CryptoService");

class VSMController {
  static async get(req, res) {
    try {
      const allVsm = await VSM.findAll();
      res.status(200).send(allVsm);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async filteredGet(req, res) {
    try {
      const allVsm = await VSM.findFiltered();
      res.status(200).send(allVsm);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }
}

module.exports = VSMController;
