// inicializacao de rotas
const express = require("express");
const Auth = require('../src/routes/Auth')
const POC = require("../src/routes/POC");
const User = require("../src/routes/User");
const Process = require("../src/routes/Process");
const PartNr = require("../src/routes/PartNr")
const VSM = require("../src/routes/Vsm")

module.exports = function (app) 
{
  app
    .use(express.json())
    .use("/auth", Auth)
    .use("/poc", POC)
    .use("/user", User)
    .use("/process", Process)
    .use("/partnr", PartNr)
    .use("/vsm", VSM)
};