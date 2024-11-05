var express = require("express");
var router = express.Router();

var equipeController = require("../controllers/equipeController");

router.get("/listarFuncionarios/:idEmpresa", function (req, res) {
  equipeController.listarFuncionarios(req, res);
});

module.exports = router;