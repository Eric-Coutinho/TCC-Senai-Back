const mongoose = require("mongoose");
const { ProcessSchema }= require('./Process')

const POCSchema = new mongoose.Schema({
    Process: {
        type: ProcessSchema,
        required: true
    },
    BatchID: {
        type: String,
        required: true
    },
    BatchQnt: {
        type: Date,
        required: true
    },
    ScrapQnt: {
        type: String,
        required: true
    },
    OperatorEDV: {
        type: String,
        required: true  
    },
    Interditaded: {
        type: String,
        required: true
    }
});

const POC = mongoose.model("POC", POCSchema);
exports.POC = POC;
exports.POCSchema = POCSchema;