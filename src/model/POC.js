const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    EDV: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    birth: {
        type: Date,
        required: true
    },
    CEP: {
        type: String,
        required: true
    }
});

const Player = mongoose.model("Player", PlayerSchema);
exports.Player = Player;
exports.PlayerSchema = PlayerSchema;