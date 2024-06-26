const { POC } = require('../model/POC');
const { ProcessController, GetProcessById} = require('./ProcessController')

class POCController {
    // Create a new POC
    static async post(req, res) {
        const { ProcessId, BatchID, BatchQnt, ScrapQnt, OperatorEDV, Interditaded } = req.body;

        // Process is ProcessId
        if (!ProcessId || !BatchID || !BatchQnt || !ScrapQnt || !OperatorEDV || !Interditaded) {
            return res.status(400).send({ message: 'Fields cannot be empty' });
        }

        const Process = GetProcessById(ProcessId);

        const newPOC = new POC({
            Process,
            BatchID,
            BatchQnt,
            ScrapQnt,
            OperatorEDV,
            Interditaded
        });

        try {
            await newPOC.save();
            res.status(201).send(newPOC);
        } catch (err) {
            console.error(err);
            res.status(400).send({ message: err.message });
        }
    }

    // Get all POCs
    static async get(req, res) {
        try {
            const allPOCs = await POC.find();
            res.status(200).send(allPOCs);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err.message });
        }
    }

    // Get POC by ID
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

    // Delete POC by ID
    static async deleteById(req, res) {
        try {
            const deletedPOC = await POC.findByIdAndDelete(req.params.id);
            if (!deletedPOC) {
                return res.status(404).send({ message: 'POC not found' });
            }
            res.status(200).send({ message: 'POC deleted successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err.message });
        }
    }

    // Delete all POCs
    static async deleteAll(req, res) {
        try {
            await POC.deleteMany({});
            res.status(200).send({ message: 'All POCs deleted' });
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: err.message });
        }
    }
}

module.exports = POCController;
