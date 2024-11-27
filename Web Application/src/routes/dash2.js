var express = require("express");
var router = express.Router();

var dash2Controller = require("../controllers/dash2Controller");

router.get("/pegarDadosArabicaVsRobusta", function (req, res) {
    dash2Controller.pegarDadosArabicaVsRobusta(req, res);
});

router.get("/pegarDadosVariedadeMaisProduzida", function (req, res) {
    dash2Controller.pegarDadosVariedadeMaisProduzida(req, res);
})

router.get("/pegarDadosVariedadeMenosProduzida", function (req, res) {
    dash2Controller.pegarDadosVariedadeMenosProduzida(req, res);
})

module.exports = router;