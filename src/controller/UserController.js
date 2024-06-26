const { User } = require("../model/User");

class UserController {
    // Create a new user
    static async post(req, res) {
        const { EDV, Name, Password, Birth, Gender, CEP } = req.body;

        try {
            const newUser = new User({
                EDV,
                Name,
                Password,
                Birth,
                Gender,
                CEP
            });

            await newUser.save();
            res.status(201).send(newUser);
        } catch (error) {
            console.error(error);
            res.status(400).send({ message: error.message });
        }
    }

    // Get all users
    static async get(req, res) {
        try {
            const users = await User.find();
            res.status(200).send({ users });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Failed to fetch users' });
        }
    }

    // Get user by ID
    static async getById(req, res) {
        const id = req.params.id;

        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }
            res.status(200).send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Failed to fetch user' });
        }
    }

    // Delete user by ID
    static async deleteById(req, res) {
        const id = req.params.id;

        try {
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(404).send({ message: 'User not found' });
            }
            res.status(200).send({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Failed to delete user' });
        }
    }

    // Delete all users
    static async deleteAll(req, res) {
        try {
            await User.deleteMany({});
            res.status(200).send({ message: 'All users deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Failed to delete all users' });
        }
    }
}

module.exports = UserController;
