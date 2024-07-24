const express = require("express");
const UserController = require("../controller/UserController");
const router = express.Router();

router
  .post("/create", UserController.post)
  .get("/get", UserController.get)
  .get("/get/:edv", UserController.getById)
  .delete("/delete/:edv", UserController.deleteById)
  .delete("/delete", UserController.deleteAll);

module.exports = router;
