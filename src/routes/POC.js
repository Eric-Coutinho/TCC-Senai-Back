const express = require("express");
const POCController = require("../controller/POCController");
const router = express.Router();

router
  .post("/create", POCController.postPlayer)
  .get("/get", POCController.getPlayers)
  .delete("/delete", POCController.clearPlayers);

module.exports = router;