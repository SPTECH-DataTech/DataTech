var express = require("express");
var router = express.Router();

var fazendaController = require("../controllers/fazendaController");

router.post("/adicionarFazenda", (req, res) => {
   fazendaController.adicionarFazenda(req, res);
});

router.post("/removerFazenda", (req, res) => {
   fazendaController.removerFazenda(req, res);
});

router.put("/editarFazenda", (req, res) => {
   fazendaController.editarFazenda(req, res);
});


router.get("/listarEstados", (req, res) => {
   fazendaController.listarEstados(req, res);
});

router.get("/listarFazendas", (req, res) => {
   fazendaController.listarFazendas(req, res);
});


module.exports = router;