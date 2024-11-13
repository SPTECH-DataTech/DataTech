var express = require("express");
var router = express.Router();

var equipeController = require("../controllers/equipeController");

router.get("/carregarCargos", function (req, res) {
  equipeController.carregarCargos(req, res);
});

router.get("/listarFuncionarios/1", function (req, res) {
  equipeController.listarFuncionarios(req, res);
});

router.post("/adicionar", function (req, res) {
  equipeController.adicionar(req, res);
});

router.delete("/excluir/:idUsuario", function (req, res) {
  equipeController.excluir(req, res);
});

router.put("/editar/:idUsuario", function (req, res) {
  equipeController.editar(req, res);
});

module.exports = router;