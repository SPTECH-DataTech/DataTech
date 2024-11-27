var database = require("../database/config");

function dadosGraficoArabicaVsRobusta() {

    var instrucaoSql = `select
    estado,
    SUM(quantidadeColhida) toneladasColhidas,
    nome
from plantacaoMunicipioDash
inner join estadoMunicipio
on fkMunicipio = idMunicipio
inner join tipoCafe
on fkTipoCafe = idTipoCafe
where fkTipoCafe = 1 and ano = 1985
group by nome, estado
union
select
    estado,
    SUM(quantidadeColhida) toneladasColhidas,
    nome
from plantacaoMunicipioDash
inner join estadoMunicipio
on fkMunicipio = idMunicipio
inner join tipoCafe
on fkTipoCafe = idTipoCafe
where fkTipoCafe = 2 and ano = 1985
group by nome, estado;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function variedadeMaisProduzida() {

    var instrucaoSql = `select
    estado,
    ROUND(SUM((areaPlantada * 38.74 * 60) / 1000), 0) toneladasPlantadas,
    SUM(quantidadeColhida) toneladasColhidas,
    ROUND(((SUM(quantidadeColhida) * 100) / ROUND(SUM((areaPlantada * 38.74 * 60) / 1000), 0)), 2) percentualEfeciencia,
    nome
from plantacaoMunicipioDash
inner join estadoMunicipio
on fkMunicipio = idMunicipio
inner join tipoCafe
on fkTipoCafe = idTipoCafe
where fkTipoCafe = 1 and ano = 1985
group by nome, estado
order by toneladasColhidas desc
limit 1;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function variedadeMenosProduzida() {

    var instrucaoSql = `select
    estado,
    ROUND(SUM((areaPlantada * 38.74 * 60) / 1000), 0) toneladasPlantadas,
    SUM(quantidadeColhida) toneladasColhidas,
    ROUND(((SUM(quantidadeColhida) * 100) / ROUND(SUM((areaPlantada * 38.74 * 60) / 1000), 0)), 2) percentualEfeciencia,
    nome
from plantacaoMunicipioDash
inner join estadoMunicipio
on fkMunicipio = idMunicipio
inner join tipoCafe
on fkTipoCafe = idTipoCafe
where ano = 1985
group by nome, estado
order by toneladasColhidas asc
limit 1;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    dadosGraficoArabicaVsRobusta,
    variedadeMaisProduzida,
    variedadeMenosProduzida

}
