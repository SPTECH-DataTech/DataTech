var usuarioModel = require("../models/usuarioModel");
const consultarEmail = require('../models/recuperarSenhaModel');

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.status(200).json({ 
                            message: "Login realizado com sucesso!", 
                            id: resultadoAutenticar[0].id,
                            nome: resultadoAutenticar[0].nome,
                            email: resultadoAutenticar[0].email,
                            idEmpresa: resultadoAutenticar[0].fkEmpresa,
                            idCargo: resultadoAutenticar[0].fkCargo,
                            idFazenda: resultadoAutenticar[0].fkFazenda,
                            permissaoCargos: resultadoAutenticar[0].permissaoCargos,
                            permissaoFazendas: resultadoAutenticar[0].permissaoFazendas,
                            permissaoFuncionarios: resultadoAutenticar[0].permissaoFuncionarios

                        });

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).json({ erro: "Email e/ou senha inválido(s)" });
                    } else {
                        res.status(403).json({ erro: "Mais de um usuário com o mesmo login e senha!" });
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json({ erro: "Houve um erro ao realizar o login!", erro: erro.sqlMessage });
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.idEmpresaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else {

        usuarioModel.cadastrar(nome, email, senha, fkEmpresa, cpf)
            .then(
                function (resultado) {
                    if (resultado.length > 0){
                        res.status(409).json({erro: "Usuário já cadastrado!"});
                    }
                    res.status(200).json({ 
                        resultado,
                        fkEmpresa,
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
    autenticar,
    cadastrar
}