const express = require("express");
const AuthController = require("../controller/AuthContoller");
const router = express.Router();

router
  .post("/login", AuthController.Login)
  .post("/email", AuthController.sendEmail)
  .post("validate", AuthController.validateToken)
  .post("/validtoken", AuthController.validateRecoveryToken)
  .post("/changepassword", AuthController.changePassword)

module.exports = router;