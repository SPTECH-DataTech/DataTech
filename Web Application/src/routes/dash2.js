var express = require("express");
var router = express.Router();

var dash2Controller = require("../controllers/dash2Controller");

router.get("/listarComparacaoProducaoCafe/:idEmpresa/:ano", function (req, res) {
    dash2Controller.listarComparacaoProducaoCafe(req, res);
});

router.get("/obterCafeMaisEficiente/:idEmpresa/:ano", function (req, res) {
    dash2Controller.obterCafeMaisEficiente(req, res);
});

router.get("/obterCafeMenosEficiente/:idEmpresa/:ano", function (req, res) {
    dash2Controller.obterCafeMenosEficiente(req, res);
});

router.get("/obterTop5/:idEmpresa/:ano", function (req, res) {
    dash2Controller.obterTop5(req, res);
});


router.get("/totalSafra/:ano/:idEmpresa", function (req, res) {
    dash2Controller.totalSafra(req, res);
});

router.get("/consultarAnos/:idEmpresa", function (req, res) {
    dash2Controller.listarAnos(req, res);
});

module.exports = router;
