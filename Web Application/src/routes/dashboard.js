var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.post("/listarProducaoCafe", function (req, res) {
    dashboardController.listarProducaoCafe(req, res);
});


router.post("/obterMaiorEficiencia", function (req, res) {
    dashboardController.obterMaiorEficiencia(req, res);
});

router.post("/obterMenorEficiencia", function (req, res) {
    dashboardController.obterMenorEficiencia(req, res);
});

router.get("/listarAnos/:idEmpresa", function (req, res) {
    dashboardController.listarAnos(req, res);
});


router.get("/listarTiposDeCafe/:idEmpresa", function (req, res) {
    dashboardController.listarTiposDeCafe(req, res);
});


router.post("/listarEstados", function (req, res) {
    dashboardController.listarEstados(req, res);
});


router.post("/listarClimogramaPorAno", function (req, res) {
    dashboardController.listarClimogramaPorAno(req, res);
});


router.post("/listarClimaInadequado", function (req, res) {
    dashboardController.listarClimaInadequado(req, res);
});


module.exports = router;