const express = require("express");
const UserController = require("../controller/UserController");
const router = express.Router();

router
  .post("/create", UserController.postPlayer)
  .get("/login", UserController.getPlayers)
  .delete("/delete", UserController.clearPlayers);

module.exports = router;