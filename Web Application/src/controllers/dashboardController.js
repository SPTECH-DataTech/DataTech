var dashboardModel = require("../models/dashboardModel");

function listarProducaoCafe(req, res) {
    let ano = req.body.anoServer;
    let tipoCafe = req.body.tipoCafeServer;

    if (ano == undefined) {
        res.status(400).send("Ano está undefined");
    } else if (tipoCafe == undefined) {
        res.status(400).send("Tipo de café está undefined");
    } else {
        dashboardModel.listarProducaoCafe(ano, tipoCafe)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao consultar a produção de café", erro.sqlMessage);
                    res.status(500).json({ erro: "Houve um erro ao consultar a produção de café", erro: erro.sqlMessage });
                }
            );
    }
}

function obterMaiorEficiencia(req, res) {
    let ano = req.body.anoServer;
    let tipoCafe = req.body.tipoCafeServer;

    if (ano == undefined) {
        res.status(400).send("Ano está undefined");
    } else if (tipoCafe == undefined) {
        res.status(400).send("Tipo de café está undefined");
    } else {
        dashboardModel.obterMaiorEficiencia(ano, tipoCafe)
            .then(
                function (resultado) {
                    if (resultado && resultado.length > 0) {
                        let estado = resultado[0].estado;
                        let quantidadePlantada = resultado[0].quantidadePlantada;
                        let quantidadePerdida = resultado[0].quantidadePerdida;
                        let porcentagemPerda = resultado[0].porcentagemPerda;

                        res.json({
                            estado: estado,
                            quantidadePlantada: quantidadePlantada,
                            quantidadePerdida: quantidadePerdida,
                            porcentagemPerda: porcentagemPerda
                        });
                    } else {
                        res.status(404).send("Nenhum resultado encontrado.");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json({ erro: "Erro ao consultar dados", erroDetalhado: erro.sqlMessage });
                }
            );
    }
}

function obterMenorEficiencia(req, res) {
    let ano = req.body.anoServer;
    let tipoCafe = req.body.tipoCafeServer;

    if (ano == undefined) {
        res.status(400).send("Ano está undefined");
    } else if (tipoCafe == undefined) {
        res.status(400).send("Tipo de café está undefined");
    } else {
        dashboardModel.obterMenorEficiencia(ano, tipoCafe)
            .then(
                function (resultado) {
                    if (resultado && resultado.length > 0) {
                        let estado = resultado[0].estado;
                        let quantidadePlantada = resultado[0].quantidadePlantada;
                        let quantidadePerdida = resultado[0].quantidadePerdida;
                        let porcentagemPerda = resultado[0].porcentagemPerda;

                        res.json({
                            estado: estado,
                            quantidadePlantada: quantidadePlantada,
                            quantidadePerdida: quantidadePerdida,
                            porcentagemPerda: porcentagemPerda
                        });
                    } else {
                        res.status(404).send("Nenhum resultado encontrado.");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json({ erro: "Erro ao consultar dados", erroDetalhado: erro.sqlMessage });
                }
            );
    }
}

module.exports = {
    listarProducaoCafe,
    obterMaiorEficiencia,
    obterMenorEficiencia
};

