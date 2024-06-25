const express = require("express");
const ProcessController = require("../controller/ProcessController");
const router = express.Router();

router
  .post("/create", ProcessController.postPlayer)
  .get("/get", ProcessController.getPlayers)
  .delete("/delete", ProcessController.clearPlayers);

module.exports = router;