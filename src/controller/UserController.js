const User = require('../model/User');

class UserController {
  static async post(req, res) {
    const { EDV, FirstName, LastName, DisplayName, Email, Birth, BoschId } = req.body;

    if (!EDV || !FirstName || !LastName || !DisplayName || !Email || !Birth || !BoschId) {
      return res.status(400).send({ message: 'Fields cannot be empty' });
    }

    // Convert the Birth string to a Date object
    const [day, month, year] = Birth.split('/').map(Number);
    const birthDate = new Date(year, month, day);

    try {
      const newUser = await User.create(EDV, FirstName, LastName, DisplayName, Email, birthDate, BoschId);
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
