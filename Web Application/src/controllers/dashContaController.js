var dashContaModel = require("../models/dashContaModel");

function mostrarInformacoesConta(req, res) {

    var idUsuario = req.params.idUsuario

    if (idUsuario == undefined) {
        res.status(400).send("idUsuario está undefined!");
    } else {

        dashContaModel.mostrarInformacoesConta(idUsuario).then((resposta) => {
            res.status(200).json(resposta);
        }).catch((erro) => {
            console.error("Erro ao listar funcionários: ", erro);
            res.status(500).json({ erro: "Erro ao listar funcionários" });
        });
    }
}

function alterarSenha(req, res){
    var {idUsuario} = req.params;
    var novaSenha = req.body.novaSenhaServer;

    if (idUsuario == undefined) {
        res.status(400).send("idUsuario está undefined!");
    } else {

        dashContaModel.alterarSenha(idUsuario, novaSenha).then((resposta) => {
            res.status(200).json(resposta);
        }).catch((erro) => {
            console.error("Erro ao listar funcionários: ", erro);
            res.status(500).json({ erro: "Erro ao listar funcionários" });
        });
    }

}

module.exports = {
    mostrarInformacoesConta,
    alterarSenha,
}