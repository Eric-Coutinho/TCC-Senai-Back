const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectToDB = require('./startup/db'); // Adjust the path if necessary

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

// inicializa a porta
const port = process.env.PORT || 8080;
// app.listen(port, () => console.log(`Server is running on port ${port}`));
app.listen(port, () => console.log(`Acesse: http://localhost:${port}/`));