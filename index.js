const express = require("express");
const cors = require("cors");
const { encrypt } = require('./services/CryptoService')
const { generateJWT } = require('./services/JWTService')
const { connectToDB } = require('./startup/db'); // Adjust the path if necessary
const { enc } = require("crypto-js");

require('dotenv').config()

const app = express();

connectToDB();

// uns cors pra n dar merda
app.use(
  cors({
    origin: "*",
    methods: ["GET","POST","PUT","PATCH","DELETE"],
    // preflightContinue: false,
    // optionsSuccessStatus: 204,
    allowedHeaders: "*"
  })
);

// inicializa as rotas
require("./startup/routes")(app);

const input = { 
  Name: "teste", 
  CT: 123, 
  OEE: 2341, 
  POT: 234, 
  MAEQnt: 1, 
}
//  const jwt = generateJWT(input);
// console.log('jwt: ' + jwt)
 const encData = encrypt(input);
console.log('encypt: ' + encData)

// inicializa a porta
const port = process.env.PORT || 8080;
// app.listen(port, () => console.log(`Server is running on port ${port}`));
app.listen(port, () => console.log(`Acesse: http://localhost:${port}/`));