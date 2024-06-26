const express = require("express");
const ProcessController = require("../controller/ProcessController");
const router = express.Router();


router
  .post("/create", ProcessController.post)
  .get("/", ProcessController.get)
  .delete("/", ProcessController.deleteAll)
  .get("/:id", ProcessController.getById)
  .delete("/:id", ProcessController.deleteById)

module.exports = router;
