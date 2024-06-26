const express = require("express");
const UserController = require("../controller/UserController");
const router = express.Router();

router
  .post("/create", UserController.post)
  .get("/", UserController.get)
  .get("/:id", UserController.getById)
  .delete("/:id", UserController.deleteById)
  .delete("/", UserController.deleteAll);

module.exports = router;
