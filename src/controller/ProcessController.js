const Process = require('../model/Process');
const { decrypt } = require('../../services/CryptoService');

class ProcessController {
  static async post(req, res) {
    const { EncryptedBody } = req.body;
    const { Name, CT, OEE, POT, MAEQnt, Type, Order } = decrypt(EncryptedBody)
    
    if (!Name || !CT || !OEE || !POT || !MAEQnt || !Order) {
      return res.status(400).send({ message: 'Os campos não podem estar vazios.' });
    }
    
    try {
      const newProcess = await Process.create(Name, CT, OEE, POT, MAEQnt, Type, Order);
      if (newProcess)
      res.status(201).send({ message: 'Processo criado com sucesso.' });
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
        return res.status(404).send({ message: 'Processo não encontrado.' });
      }
      res.status(200).send(process);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async updateById(req, res) {
    const { EncryptedBody } = req.body;
    const { id, Name, CT, OEE, POT, MAEQnt, Type, Order } = decrypt(EncryptedBody)

    try {
      const process = await Process.findById(id);
      if (!process) {
        return res.status(404).send({ message: 'Processo não encontrado.' });
      }

      const update = await Process.updateById(id, { Name, CT, OEE, POT, MAEQnt, Type, Order })
      if (update) {
        res.status(200).send({ success: true, message: "Processo atualizado com sucesso."});
        return;
      }
      throw new Error('Algo deu errado na atualização do processo. Tente novamente.');
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async deleteById(req, res) {
    try {
      const deletedProcess = await Process.deleteById(req.params.id);
      if (!deletedProcess) {
        return res.status(404).send({ message: 'Processo não encontrado.' });
      }
      res.status(200).send({ message: 'Processo removido com sucesso.' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async deleteAll(req, res) {
    try {
      await Process.deleteAll();
      res.status(200).send({ message: 'Todos os processos foram removidos.' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }
}

module.exports = ProcessController;
