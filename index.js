const express = require("express");
const cors = require("cors");
const { encrypt, decrypt } = require('./services/CryptoService')
const { generateJWT, verifyJWT } = require('./services/JWTService')
const { connectToDB } = require('./startup/db'); // Adjust the path if necessary
const { enc } = require("crypto-js");

require('dotenv').config()

const app = express();

connectToDB();

// uns cors pra n dar merda
app.use(
  cors({
    origin: true,
    methods: "GET,POST,DELETE,PUT,PATCH",
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

// inicializa as rotas
require("./startup/routes")(app);

// inicializa a porta
const port = process.env.PORT || 8080;
// app.listen(port, () => console.log(`Server is running on port ${port}`));
app.listen(port, () => console.log(`Acesse: http://localhost:${port}/`))

// const input = { 
//   Name: "teste", 
//   CT: "123", 
//   OEE: "2341", 
//   POT: "234", 
//   MAEQnt: "1", 
// }
//  const jwt = generateJWT(input);
// console.log('jwt: ' + jwt)
// const encData = encrypt(input);
// console.log('encypt: ' + encData)

// const decData = decrypt("U2FsdGVkX19Es50XfHuKptg7/NySYqGSwfYJ/vDiZAXFKJmMMBGB2mGrQGl97U2KzR1YDcJumLuWttuYpMiEXMu2wfy0nZPvySM0Nb6FGqpy9fgkjeq2d9OlSVXIcg66INxlNLSS612+fj7kZBDKyA==")
// console.log("decrypt:" + decData)

// const obj = {
//   Name: "Maquina de ordem",
//   CT: "1123",
//   OEE: "13",
//   POT: "132",
//   MAEQnt: "321",
//   Order: 1
// };
// const { Name } = obj
// console.log("onj: ", encrypt(obj))

const obj2 = {
  id: 37,
  Name: "TEST",
  CT: "119",
  OEE: "11",
  POT: "9",
  MAEQnt: "11",
  Order: 9999
};

const a = {
  "EDV": "77777",
  "FirstName": "Loud",
  "LastName": "Caspas",
  "DisplayName": "Loud Caspas (CtP/ETS)",
  "Email": "loud.caspas@email.com",
  "Birth": "2024-09-17",
  "Password": "olhanao",
  "BoschId": "CAL1CT"
}

console.log("\nobj2", encrypt(a))
const payload = {
  userId: '1234567890',
  username: 'john_doe',
  role: 'test'
}
const token = generateJWT(payload);
console.log('\njwt: ', token)