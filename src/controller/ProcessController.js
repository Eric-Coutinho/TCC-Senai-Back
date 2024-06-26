const { Process } = require("../model/Process");

class ProcessController {
    // Get all processes
    static async get(req, res) {
        try {
            const processes = await Process.find();
            return res.status(200).send({ processes });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Failed to fetch processes' });
        }
    }

    // Create a new process
    static async post(req, res) {
        const { Name, CT, OEE, POT, MAEQnt, Type } = req.body;

        try {
            const process = new Process({
                Name,
                CT,
                OEE,
                POT,
                MAEQnt,
                Type
            });
            await process.save();
            return res.status(201).send({ message: 'Process created successfully', process });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Failed to create process' });
        }
    }

    // Delete all processes
    static async deleteAll(req, res) {
        try {
            await Process.deleteMany({});
            return res.status(200).send({ message: 'All processes deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Failed to delete all processes' });
        }
    }

    // Get process by ID
    static async getById(req, res) {
        const id = req.params.id;

        try {
            const process = await Process.findById(id);
            if (!process) {
                return res.status(404).send({ error: 'Process not found' });
            }
            return res.status(200).send(process);
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Failed to fetch process' });
        }
    }

    // Delete process by ID
    static async deleteById(req, res) {
        const id = req.params.id;

        try {
            const process = await Process.findByIdAndDelete(id);
            if (!process) {
                return res.status(404).send({ error: 'Process not found' });
            }
            return res.status(200).send({ message: 'Process deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Failed to delete process' });
        }
    }

    static async GetProcessById(Id)
    {
        const process = await Process.findById(Id);
        if (!process) 
            return null;
        
        return process
    }
}

module.exports = ProcessController;
