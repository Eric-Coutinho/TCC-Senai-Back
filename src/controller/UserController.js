const User = require('../model/User');
const { decrypt } = require("../../services/CryptoService");
const crypto = require('crypto'); // Use built-in crypto library for generating salt and hashing

class UserController {
  static async post(req, res) {
    const { EncryptedBody } = req.body;

    const { EDV, FirstName, LastName, DisplayName, Email, Password, Birth, BoschId } = decrypt(EncryptedBody);
    console.log(decrypt(EncryptedBody))
    if (!EDV || !FirstName || !LastName || !DisplayName || !Email || !Birth || !BoschId) {
      return res.status(400).send({ message: 'Os campos não podem estar vazios.' });
    }

    const user1 = await User.findById(EDV)
    if(user1)
      return res.status(400).send({ message: 'Já existe um usuário com este EDV.' });

    const user2 = await User.findByEmail(Email)
    if(user2)
      return res.status(400).send({ message: 'Já existe um usuário com este Email.' });

    // Convert the Birth string to a Date object
    const [year, month, day] = Birth.split('-').map(Number);
    const birthDate = new Date(year, month - 1, day);

    try {
      const salt = crypto.randomBytes(16).toString('hex'); 
      const hashedPassword = crypto
        .pbkdf2Sync(Password, salt, 10000, 64, 'sha512')
        .toString('hex'); // Hash with 10,000 iterations, 64-byte length, and SHA-512

        console.log(hashedPassword)
      const newUser = await User.create(
        EDV,
        FirstName,
        LastName,
        DisplayName,
        Email,
        Password, 
        birthDate,
        BoschId,
        salt
      );

      if (!newUser)
        throw new Error('Algo deu errado na criação do usuário. Tente novamente.');

      res.status(201).send({ message: 'Usuário criado com sucesso.' });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
}

  static async get(req, res) {
    try {
      const allUsers = await User.findAll();
      res.status(200).send(allUsers);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const user = await User.findById(req.params.edv);
      if (!user) {
        return res.status(404).send({ message: 'Usuário não encontrado.' });
      }
      res.status(200).send(user);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async updateById(req, res) {
    const { EDV, FirstName, LastName, DisplayName, Email, Password, Birth, BoschId } = req.body;

    try {
      const user = await User.findById(EDV);
      if (!user) {
        return res.status(404).send({ message: 'Usuário não encontrado.' });
      }

      User.updateById(EDV, { FirstName, LastName, DisplayName, Email, Password, Birth, BoschId })
      res.status(200).send({ success: true, message: "Usuário atualizado com sucesso."});
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async deleteById(req, res) {
    try {
      const deletedUser = await User.deleteById(req.params.edv);
      if (!deletedUser) {
        return res.status(404).send({ message: 'Usuário não encontrado.' });
      }
      res.status(200).send({ message: 'Usuário removido com sucesso.' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async deleteAll(req, res) {
    try {
      await User.deleteAll();
      res.status(200).send({ message: 'Todos os usuários foram removidos.' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }
}

module.exports = UserController;
