// inicializacao de rotas
const express = require("express");
const POC = require("../src/routes/POC");
const User = require("../src/routes/User");
module.exports = function (app) 
{
  app
    .use(express.json())
    .use("/POC", POC)
    .use("/user", User)
    // .use("/process", process)
};