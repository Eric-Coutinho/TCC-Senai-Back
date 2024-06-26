const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    EDV: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Pasword: {
        type: String,
        required: true
    },
    Birth: {
        type: Date,
        required: true
    },
    Gender: {
        type: String,
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