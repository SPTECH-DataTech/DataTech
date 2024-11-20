var cargoModel = require("../models/cargoModel");

function listarCargos(req, res) {
    let fazenda = req.body.fazendaServer;

    if (fazenda == undefined) {
        res.status(400).send("empresa está undefined")
    } else {
        cargoModel.listarCargos(fazenda)
            .then(
                function (resultadoListarCargos) {
                    console.log(`\nResultados encontrados: ${resultadoListarCargos.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoListarCargos)}`);

                    console.log(resultadoListarCargos);
                    res.json(resultadoListarCargos);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao consultar os cargos", erro.sqlMessage);
                    res.status(500).json({ erro: "Houve um erro ao consultar os cargos", erro: erro.sqlMessage });
                }
            )
    }
}

function adicionarCargo(req, res) {
    const nomeCargo = req.body.nomeCargoServer;
    const permissaoCargos = req.body.permissaoCargosServer;
    const permissaoFazendas = req.body.permissaoFazendasServer;
    const permissaoFuncionarios = req.body.permissaoFuncionariosServer;
    const fazenda = req.body.fazendaServer;

    try {
        cargoModel.adicionarCargo(nomeCargo, permissaoCargos, permissaoFazendas, permissaoFuncionarios, fazenda);
        console.log(`Cargo inserido no banco de dados[Nome: ${nomeCargo}, Cargos: ${permissaoCargos}, Fazendas: ${permissaoFazendas}, Funcionarios: ${permissaoFuncionarios}`);
    } catch {
        console.log("Houve um erro ao inserir o cargo", erro.sqlMessage);
        res.status(500).json({ erro: "Houve um erro ao inserir o cargo", erro: erro.sqlMessage });
    }
}

function removerCargo(req, res) {
    const listaIdsCargos = req.body.listarIdsServer;

    try {
        cargoModel.removerCargos(listaIdsCargos);
        console.log(`Cargos removidos com sucesso: ${listaIdsCargos}`);
    } catch {
        console.log(`Falha ao remover os cargos com os IDs: ${listaIdsCargos}`);
        res.status(400).json({ mensagem: `Falha ao remover os cargos ${listaIdsCargos}` })
    }
}

module.exports = {
    listarCargos,
    adicionarCargo,
    removerCargo
};