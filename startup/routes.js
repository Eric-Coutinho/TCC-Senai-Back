// inicializacao de rotas
const express = require("express");
// const player = require("../src/routes/player");
// const test = require("../src/routes/test");
module.exports = function (app) 
{
  app
    .use(express.json())
    // .use("/POC", POC)
    // .use("/user", user)
    // .use("/process", process)
};