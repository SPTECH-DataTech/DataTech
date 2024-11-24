var express = require("express");
var router = express.Router();

var cargoController = require("../controllers/cargoController");

router.post("/listar", function (req, res) {
    cargoController.listarCargos(req, res);
});

router.post("/adicionar", function(req, res) {
    cargoController.adicionarCargo(req, res);
});

router.delete("/remover", function(req, res) {
    cargoController.removerCargo(req, res);
});

router.put("/editar", function(req, res) {
    cargoController.editarCargo(req, res);
});

router.post("/consultarFazenda", function (req, res) {
    cargoController.consultarFazenda(req, res);
});

module.exports = router;