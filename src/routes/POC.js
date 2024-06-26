const express = require("express");
const POCController = require("../controller/POCController");
const router = express.Router();

router
  .post("/create", POCController.post)
  .get("/", POCController.get)
  .get("/:id", POCController.getById)
  .delete("/", POCController.deleteAll)
  .delete("/:id", POCController.deleteById);

module.exports = router;