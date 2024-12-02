var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.post("/listarProducaoCafe", function (req, res) {
    dashboardController.listarProducaoCafe(req, res);
});


router.post("/obterMaiorEficiencia", function (req, res) {
    dashboardController.obterMaiorEficiencia(req, res);
});


module.exports = router;
