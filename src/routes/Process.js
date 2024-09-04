const express = require("express");
const ProcessController = require("../controller/ProcessController");
const router = express.Router();


router
  .post("/create", ProcessController.post)
  .get("/get", ProcessController.get)
  .get("/get/:id", ProcessController.getById)
  .put("/put", ProcessController.updateById)
  .delete("/delete", ProcessController.deleteAll)
  .delete("/delete/:id", ProcessController.deleteById)

module.exports = router;
