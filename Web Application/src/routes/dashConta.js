var express = require("express");
var router = express.Router();

var contaController = require("../controllers/contaController");


router.get("/listarFuncionarios/1", function (req, res) {
    contaController.listarFuncionarios(req, res);
  });

module.exports = router;