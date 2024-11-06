var equipeModel = require("../models/equipeModel");

function listarFuncionarios(req, res) {
    var idEmpresa = req.params.idEmpresa;

    equipeModel.listarFuncionarios(idEmpresa).then((resposta) => {
        res.status(200).json(resposta);
    }).catch((erro) => {
        console.error("Erro ao listar funcionários: ", erro);
        res.status(500).json({ erro: "Erro ao listar funcionários" });
    });
}

function excluirFuncionarios(req, res) {
    var idEmpresa = req.params.idEmpresa;

    equipeModel.excluirFuncionarios(idEmpresa, nomeUsuario).then((resposta) => {
        res.status(200).json(resposta);
    }).catch((erro) => {
        console.error("Erro ao excluir funcionários: ", erro);
        res.status(500).json({ erro: "Erro ao excluir funcionários" });
    });
}

module.exports = {
    listarFuncionarios,
    excluirFuncionarios,
}