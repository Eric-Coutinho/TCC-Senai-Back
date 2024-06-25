const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectToDB = require('./startup/db'); // Adjust the path if necessary
const { encrypt, decrypt } = require('./services/CryptoService'); // Adjust the path as per your file structure

require('dotenv').config()

const app = express();

connectToDB();

// Example data to encrypt
const dataToEncrypt = 'HALOOO'

// Encrypt the data
const encryptedData = encrypt(dataToEncrypt);
console.log('Encrypted Data:', encryptedData);

const decryptedData = decrypt(encryptedData);
console.log('Decrypted Data:', decryptedData);

// uns cors pra n dar merda
app.use(
  cors({
    origin: "*",
    methods: ["GET","POST","DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

// inicializa as rotas
require("./startup/routes")(app);

// inicializa a porta
const port = process.env.PORT || 8080;
// app.listen(port, () => console.log(`Server is running on port ${port}`));
app.listen(port, () => console.log(`Acesse: http://localhost:${port}/`));