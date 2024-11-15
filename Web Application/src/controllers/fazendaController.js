const fazendaModel = require('../models/fazendaModel');

function adicionarFazenda(req, res) {
    var { nomeFazenda, tipoCafe, estadoFazenda, idEmpresa } = req.body;

    if (!nomeFazenda) {
        res.status(400).send("Nome da fazenda está undefined!")
    } else if (!tipoCafe) {
        res.status(400).send("O tipo de café da fazenda está undefined!")
    } else if (!estadoFazenda) {
        res.status(400).send("O estado da fazenda está undefined!")
    } else if (!idEmpresa) {
        res.status(400).send("A empresa está undefined!")
    } else {
        fazendaModel.adicionarFazenda(nomeFazenda, tipoCafe, estadoFazenda, idEmpresa).then(function (resultado) {
            console.log(`Fazenda "${nomeFazenda}" registrada no banco de dados.`);
            res.status(201).json({ 
                message: 'Fazenda registrada com sucesso!', resultado });

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


module.exports = {
    listarEstados,
    adicionarFazenda,
    listarFazendas
}