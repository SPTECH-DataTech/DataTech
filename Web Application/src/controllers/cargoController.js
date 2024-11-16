var cargoModel = require("../models/cargoModel");

function listarCargos (req, res) {
    let empresa = req.body.empresaServer;

    if (empresa == undefined) {
        res.status(400).send("empresa está undefined")
    } else {
        cargoModel.listarCargos(empresa)
        .then (
            function (resultadoListarCargos) {
                console.log(`\nResultados encontrados: ${resultadoListarCargos.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoListarCargos)}`);

                if (resultadoListarCargos.length == 0) {
                    res.status(204).json({message: "Sem cargos para exibir"});
                } else {
                    console.log(resultadoListarCargos);
                    res.status(200).json({
                        message: "Cargos listados com sucesso",
                        id: resultadoListarCargos[0].id,
                        nomeCargo: resultadoListarCargos[0].nomeCargo,
                        permissaoCargos: resultadoListarCargos[0].permissaoCargos,
                        permissaoFazenda: resultadoListarCargos[0].permissaoFazenda,
                        permissaoFuncionarios: resultadoListarCargos[0].permissaoFuncionarios
                    })
                }
            }
        ).catch(
            function(erro) {
                console.log(erro);
                console.log("\nHouve um erro ao consultar os cargos", erro.sqlMessage)
                res.status(500).json({ erro: "Houve um erro ao consultar os cargos", erro: erro.sqlMessage });
            }
        )
    }
}
