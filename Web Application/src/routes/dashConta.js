var express = require("express");
var router = express.Router();

var dashContaController = require("../controllers/dashContaController");


router.get("/mostrarInformacoesConta/:idUsuario", function (req, res) {
    dashContaController.mostrarInformacoesConta(req, res);
  });

  router.put("/alterarSenha/:idUsuario/:novaSenha", function (req, res) {
    dashContaController.alterarSenha(req, res);
  });

module.exports = router;