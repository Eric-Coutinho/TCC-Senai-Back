const express = require("express");
const UserController = require("../controller/UserController");
const router = express.Router();

router
  .post("/create", UserController.post)
  .get("/get", UserController.get)
  .get("/get/:id", UserController.getById)
  .delete("/delete/:id", UserController.deleteById)
  .delete("/delete", UserController.deleteAll);

module.exports = router;
