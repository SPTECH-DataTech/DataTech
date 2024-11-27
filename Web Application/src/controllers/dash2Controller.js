var dash2Model = require("../models/dash2Model");

function pegarDadosArabicaVsRobusta(req, res) {

    console.log(`Recuperando medidas em tempo real (Dash 2 - Gráfico Arábica vs Robusta)`);

    dash2Model.dadosGraficoArabicaVsRobusta().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado! (Dash 2 - Gráfico Arábica vs Robusta)")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas. (Dash 2 - Gráfico Arábica vs Robusta)", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function pegarDadosVariedadeMaisProduzida(req, res) {

    console.log(`Recuperando medidas em tempo real (Dash 2 - KPI Variedade Mais Produzida)`);

    dash2Model.variedadeMaisProduzida().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado! (Dash 2 - KPI Variedade Mais Produzida)")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas. (Dash 2 - KPI Variedade Mais Produzida)", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function pegarDadosVariedadeMenosProduzida(req, res) {

    console.log(`Recuperando medidas em tempo real (Gráfico Arábica vs Robusta)`);

    dash2Model.variedadeMenosProduzida().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado! (Gráfico Arábica vs Robusta)")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas. (Gráfico Arábica vs Robusta)", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    pegarDadosArabicaVsRobusta,
    pegarDadosVariedadeMaisProduzida,
    pegarDadosVariedadeMenosProduzida

}