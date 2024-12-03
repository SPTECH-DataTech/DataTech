var express = require("express");
var router = express.Router();

var dash2Controller = require("../controllers/dash2Controller");

router.get("/listarComparacaoProducaoCafe/:idEmpresa/:ano", function (req, res) {
    dash2Controller.listarProducaoCafe(req, res);
});

router.get("/obterCafeMaisEficiente/:idEmpresa/:ano", function (req, res) {
    dash2Controller.obterMaiorEficiencia(req, res);
});

router.get("/obterCafeMenosEficiente/:idEmpresa/:ano", function (req, res) {
    dash2Controller.obterMaiorEficiencia(req, res);
});

router.get("/consultarAnos/:idEmpresa", function (req, res) {
    dash2Controller.listarAnos(req, res);
});


module.exports = router;
