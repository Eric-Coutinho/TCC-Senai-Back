// inicializacao de rotas
const express = require("express");
const Auth = require('../src/routes/Auth')
const POC = require("../src/routes/POC");
const User = require("../src/routes/User");
const Process = require("../src/routes/Process");

module.exports = function (app) 
{
  app
    .use(express.json())
    .use("/auth", Auth)
    .use("/poc", POC)
    .use("/user", User)
    .use("/process", Process)
};