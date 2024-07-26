const express = require("express");
const AuthController = require("../controller/AuthContoller");
const router = express.Router();

router
  .post("/login", AuthController.Login)

module.exports = router;