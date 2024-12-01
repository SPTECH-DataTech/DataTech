var express = require("express");
var router = express.Router();

var equipeController = require("../controllers/equipeController");

router.get("/carregarCargos", function (req, res) {
  equipeController.carregarCargos(req, res);
});

router.get("/listarFuncionarios/:idFazenda", function (req, res) {
  equipeController.listarFuncionarios(req, res);
});

router.post("/adicionar/:idFazenda", function (req, res) {
  equipeController.adicionar(req, res);
});

router.delete("/excluir/:idFuncionario", function (req, res) {
  equipeController.excluir(req, res);
});

router.put("/editar/:idFuncionario", function (req, res) {
  equipeController.editar(req, res);
});

router.put("/editarExistente/:idFuncionario", function (req, res) {
  equipeController.editarExistente(req, res);
});

module.exports = router;