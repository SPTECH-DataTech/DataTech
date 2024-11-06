var express = require("express");
var router = express.Router();

var equipeController = require("../controllers/equipeController");

router.get("/listarFuncionarios/:idEmpresa", function (req, res) {
  equipeController.listarFuncionarios(req, res);
});

router.delete("/excluirFuncionario/:idEmpresa/:nome", function (req, res) {
  equipeController.excluirFuncionario(req, res);
});

module.exports = router;