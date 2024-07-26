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
    methods: ["GET","POST","DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

// inicializa as rotas
require("./startup/routes")(app);

const input = { 
  email: "Lander.Gerotto@br.bosch.com",
  password: '123'
}
 const jwt = generateJWT(input);
console.log('jwt: ' + jwt)
 const encData = encrypt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkxhbmRlci5HZXJvdHRvQGJyLmJvc2NoLmNvbSIsInBhc3N3b3JkIjoiMTIzIiwiaWF0IjoxNzIxOTk5NDExLCJleHAiOjE3MjIwMDMwMTF9.NLczVNa1VqLohnb8lFXs3D8nTUjFBq35zDMMAoRU-k');
console.log('encypt: ' + encData)

// inicializa a porta
const port = process.env.PORT || 8080;
// app.listen(port, () => console.log(`Server is running on port ${port}`));
app.listen(port, () => console.log(`Acesse: http://localhost:${port}/`));