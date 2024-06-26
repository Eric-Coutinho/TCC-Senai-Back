const mongoose = require("mongoose");

const ProcessSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    CT: {
        type: Number,
        required: true
    },
    OEE: {
        type: Number
    },
    POT: {
        type: Number,
        required: true
    },
    MAEQnt: {
        type: Number,
        required: true
    },
    Type: {
        type: String,
        default: "Shared"
    }
});

const Process = mongoose.model("Process", ProcessSchema);
exports.Process = Process;
exports.ProcessSchema = ProcessSchema;