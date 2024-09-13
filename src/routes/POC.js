const express = require("express");
const POCController = require("../controller/POCController");
const router = express.Router();

router
  .post("/create", POCController.post)
  .get("/get", POCController.get)
  .get("/get/:id", POCController.getById)
  .put("/put", POCController.updateById)
  .delete("/delete", POCController.deleteAll)
  .delete("/delete/:id", POCController.deleteById);

module.exports = router;