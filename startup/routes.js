// inicializacao de rotas
const express = require("express");
const POC = require("../src/routes/POC");
const User = require("../src/routes/User");
const Process = require("../src/routes/Process");

module.exports = function (app) 
{
  app
    .use(express.json())
    .use("/poc", POC)
    .use("/user", User)
    .use("/process", Process)
};