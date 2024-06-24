// inicializacao de rotas
const express = require("express");
// const player = require("../src/routes/player");
// const test = require("../src/routes/test");
module.exports = function (app) 
{
  app
    .use(express.json())
    // .use("/operator", player)
    // .use("/planner", test)
};