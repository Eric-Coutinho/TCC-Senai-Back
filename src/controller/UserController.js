const User = require('../model/User');
const { decrypt } = require("../../services/CryptoService");

class UserController {
  static async post(req, res) {
    const { EncryptedBody } = req.body;

    const { EDV, FirstName, LastName, DisplayName, Email, Password, Birth, BoschId } = decrypt(EncryptedBody);

    if (!EDV || !FirstName || !LastName || !DisplayName || !Email || !Birth || !BoschId) {
      return res.status(400).send({ message: 'Fields cannot be empty' });
    }

    // Convert the Birth string to a Date object
    const [year, month, day] = Birth.split('-').map(Number);
    const birthDate = new Date(year, month - 1, day);

    try {
      const newUser = await User.create(EDV, FirstName, LastName, DisplayName, Email, Password, birthDate, BoschId);
      res.status(201).send({ message: 'User Created Successfully' });
    } catch (err) {
      console.error(err);
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
        return res.status(404).send({ message: 'User not found' });
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
        return res.status(404).send({ message: 'User not found' });
      }

      User.updateById(EDV, { FirstName, LastName, DisplayName, Email, Password, Birth, BoschId })
      res.status(200).send({ succes: true, message: "User updated succesfully"});
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async deleteById(req, res) {
    try {
      const deletedUser = await User.deleteById(req.params.edv);
      if (!deletedUser) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.status(200).send({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }

  static async deleteAll(req, res) {
    try {
      await User.deleteAll();
      res.status(200).send({ message: 'All Users deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  }
}

module.exports = UserController;
