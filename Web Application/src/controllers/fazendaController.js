const fazendaModel = require('../models/fazendaModel');

function adicionarFazenda(req, res) {
    var { nomeFazenda, tipoCafe, estadoMunicipio, idEmpresa } = req.body;

    if (!nomeFazenda) {
        res.status(400).send("Nome da fazenda está undefined!")
    } else if (!tipoCafe) {
        res.status(400).send("O tipo de café da fazenda está undefined!")
    } else if (!estadoMunicipio) {
        res.status(400).send("O estado da fazenda está undefined!")
    } else if (!idEmpresa) {
        res.status(400).send("A empresa está undefined!")
    } else {
        fazendaModel.adicionarFazenda(nomeFazenda, tipoCafe, estadoMunicipio, idEmpresa).then(function (resultado) {
            console.log(`Fazenda "${nomeFazenda}" registrada no banco de dados.`);
            res.status(201).json({
                message: 'Fazenda registrada com sucesso!', resultado
            });

        }).catch(function (erro) {
            console.error(`Houve um erro ao registrar a Fazenda "${nomeFazenda}": `, erro.sqlMessage)
            res.status(500).json({ erro: 'Houve um erro ao registrar a fazenda.' });
        });
    }
}

function listarEstados(req, res) {

    fazendaModel.listarEstados().then((resultado) => {
        res.status(200).json(resultado)
    })
        .catch((erro) => {
            console.error("Houve um erro ao listar os estados!");
            res.status(500).json(erro);
        })
}
function definirLocalidade(req, res) {

    fazendaModel.definirLocalidade().then((resultado) => {
        res.status(200).json(resultado)
    })
        .catch((erro) => {
            console.error("Houve um erro ao listar a tabela EstadoMunicipio");
            res.status(500).json(erro);
        })
}

function listarFazendas(req, res) {

    fazendaModel.listarFazendas().then((resultado) => {
        console.log(`Resultados: ${JSON.stringify(resultado)}`);
        res.status(200).json(resultado);
    })
        .catch((erro) => {
            console.error("Houve um erro ao listar as fazendas!");
            res.status(500).json(erro);
        });
}
function listarTipoCafe(req, res) {
    fazendaModel.listarTipoCafe().then((resultado) => {
        console.log(`Resultados: ${JSON.stringify(resultado)}`);
        res.status(200).json(resultado);
    })
        .catch((erro) => {
            console.error("Houve um erro ao listar os tipos de café!");
            res.status(500).json(erro);
        });
}


function removerFazenda(req, res) {
    var { idFazenda } = req.body;

    if (!idFazenda) {
        res.status(400).send("O ID da fazenda está undefined");
    } else {
        fazendaModel.removerFazenda(idFazenda).then(function (resultado) {
            console.log(`Fazenda "${idFazenda}" foi remvodida no banco de dados.`);
            res.status(200).json({
                message: 'Fazenda removida com sucesso!', resultado
            });

        }).catch(function (erro) {
            console.error(`Houve um erro ao remover a Fazenda "${idFazenda}": `, erro.sqlMessage)
            res.status(500).json({ erro: 'Houve um erro ao remover a fazenda.' });
        });
    }
}


function editarFazenda(req, res) {
    var { idFazenda, nomeFazenda, tipoCafe, estadoMunicipio } = req.body;

    if (!idFazenda) {
        res.status(400).send("O ID da fazenda está undefined");
    } if (!nomeFazenda) {
        res.status(400).send("Nome da fazenda está undefined!")
    } else if (!tipoCafe) {
        res.status(400).send("O tipo de café da fazenda está undefined!")
    } else if (!estadoMunicipio) {
        res.status(400).send("O estado da fazenda está undefined!")
    } else {
        fazendaModel.editarFazenda(nomeFazenda, tipoCafe, estadoMunicipio, idFazenda).then(function (resultado) {
            console.log(`Fazenda "${nomeFazenda}" foi editada no banco de dados.`);
            res.status(200).json({
                message: 'Fazenda editada com sucesso!', resultado
            });

        }).catch(function (erro) {
            console.error(`Houve um erro ao editar a Fazenda "${nomeFazenda}": `, erro.sqlMessage)
            res.status(500).json({ erro: 'Houve um erro ao editar a fazenda.' });
        });
    }
}

function listarPermissoes(req, res) {
    const idFuncionario = req.params.idFuncionario;

    fazendaModel.listarPermissoes(idFuncionario).then((resultado) => {
        console.log(`Resultados: ${JSON.stringify(resultado)}`);
        res.status(200).json(resultado);
    })
        .catch((erro) => {
            console.error("Houve um erro ao listar as permissões do funcionário!");
            res.status(500).json(erro);
        });
}



module.exports = {
    listarEstados,
    adicionarFazenda,
    listarFazendas,
    removerFazenda,
    editarFazenda,
    listarTipoCafe,
    listarPermissoes
}