const express = require("express");
const PartNumberController = require("../controller/PartNrController");
const router = express.Router();

router
  .post("/create", PartNumberController.post)
  .get("/get", PartNumberController.get)
  .get("/get/:id", PartNumberController.getById)
  .delete("/delete", PartNumberController.deleteAll)
  .delete("/delete/:id", PartNumberController.deleteById);

module.exports = router;