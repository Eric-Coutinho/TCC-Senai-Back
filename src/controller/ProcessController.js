const Process = require('../model/Process');
const { decrypt } = require('../../services/CryptoService');

class ProcessController {
  static async post(req, res) {
    // const { Name, CT, OEE, POT, MAEQnt, Type } = req.body;
    const { EncryptedInfo } = req.body;
    const info = decrypt(EncryptedInfo)

    if (!info.Name || !info.CT || !info.OEE || !info.POT || !info.MAEQnt) {
      return res.status(400).send({ message: 'Fields cannot be empty' });
    }

    try {
      const newProcess = await Process.create(Name, CT, OEE, POT, MAEQnt, Type);
      res.status(201).send({ message: 'Process Created Successfully' });
    } catch (err) {
      console.error(err);
      res.status(400).send({ message: err.message });
    }
  }

  static async get(req, res) {
    try {
      const allProcesses = await Process.findAll();
      res.status(200).send(allProcesses);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const process = await Process.findById(req.params.id);
      if (!process) {
        return res.status(404).send({ message: 'Process not found' });
      }
      res.status(200).send(process);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async deleteById(req, res) {
    try {
      const deletedProcess = await Process.deleteById(req.params.id);
      if (!deletedProcess) {
        return res.status(404).send({ message: 'Process not found' });
      }
      res.status(200).send({ message: 'Process deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async deleteAll(req, res) {
    try {
      await Process.deleteAll();
      res.status(200).send({ message: 'All Processes deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }
}

module.exports = ProcessController;
