const express = require("express");
const VSMController = require("../controller/VSMController");
const router = express.Router();


router
  .get("/get", VSMController.get)
  .get("/filtered", VSMController.filteredGet)

module.exports = router;
