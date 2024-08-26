const express = require("express");
const VSMController = require("../controller/VSMController");
const router = express.Router();


router
  .get("/get", VSMController.get)

module.exports = router;
