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
    Sex: {
        type: Boolean,
        required: true
    },
    CEP: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", UserSchema);
exports.User = User;
exports.UserSchema = UserSchema;