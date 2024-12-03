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

router.get("/listarAnos", function (req, res) {
    dashboardController.listarAnos(req, res);
});


router.get("/listarTiposDeCafe", function (req, res) {
    dashboardController.listarTiposDeCafe(req, res);
});

module.exports = router;
