const express = require("express");
const AuthController = require("../controller/AuthContoller");
const router = express.Router();

router
  .post("/login", AuthController.Login)
  .post("/email", AuthController.sendEmail)
  .post("/validtoken", AuthController.validateToken)

module.exports = router;