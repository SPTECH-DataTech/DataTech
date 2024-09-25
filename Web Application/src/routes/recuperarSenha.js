var express = require("express");
var router = express.Router();

var recuperarSenhaController = require('../controllers/recuperarSenhaController');

router.post("/enviarSenha", function (req, res) {
    recuperarSenhaController.enviarSenhaTemporaria(req, res);
});

module.exports = router;