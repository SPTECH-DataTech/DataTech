var equipeModel = require("../models/equipeModel");

function carregarCargos(req, res) {
    equipeModel.carregarCargos()
        .then((resposta) => {
            res.status(200).json(resposta);
        })
        .catch((erro) => {
            console.error("Erro ao listar cargos: ", erro);
            res.status(500).json({ erro: "Erro ao listar cargos" });
        });
}

function listarFuncionarios(req, res) {

    var idFazenda = req.params.idFazenda

    if (idFazenda == undefined) {
        res.status(400).send("idFazenda está undefined!");
    } else {

        equipeModel.listarFuncionarios(idFazenda).then((resposta) => {
            res.status(200).json(resposta);
        }).catch((erro) => {
            console.error("Erro ao listar funcionários: ", erro);
            res.status(500).json({ erro: "Erro ao listar funcionários" });
        });
    }
}

function adicionar(req, res) {
    var idFazenda = req.params.idFazenda;
    var idCargo = req.body.idCargoServer;
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (idFazenda == undefined) {
        res.status(400).send("idFazenda está undefined!");
    } else if (idCargo == undefined) {
        res.status(400).send("idCargo está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        equipeModel.adicionar(idFazenda, idCargo, nome, cpf, email, senha)
            .then(
                function (resultado) {
                    if (resultado.length > 0) {
                        res.status(409).json({ erro: "Usuário já cadastrado!" });
                    }
                    res.status(200).json({
                        resultado,
                        message: "Cadastro realizado com sucesso!"
                    });
                })
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json({ erro: erro.sqlMessage });
                }
            )
    }
}

function excluir(req, res) {
    const idFuncionario = req.params.idFuncionario;

    equipeModel.excluir(idFuncionario)
        .then((resposta) => {
            res.status(200).json({ message: "Funcionário excluído com sucesso!" });
        })
        .catch((erro) => {
            console.error("Erro ao excluir funcionário: ", erro);
            res.status(500).json({ erro: "Erro ao excluir funcionário" });
        });
}

function editar(req, res) {
    var idFuncionario = req.params.idFuncionario;
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var idCargo = req.body.idCargoServer;

    if (idFuncionario == undefined) {
        res.status(400).send("idFuncionario está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (idCargo == undefined) {
        res.status(400).send("idCargo está undefined!");
    } else {

        equipeModel.editar(idFuncionario, nome, email, idCargo)
            .then(
                function (resultado) {
                    if (resultado.length > 0) {
                        res.status(409).json({ erro: "Usuário já cadastrado!" });
                    }
                    res.status(200).json({
                        resultado,
                        message: "Cadastro realizado com sucesso!"
                    });
                })
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json({ erro: erro.sqlMessage });
                }
            )
    }
}

module.exports = {
    carregarCargos,
    listarFuncionarios,
    adicionar,
    excluir,
    editar,
}