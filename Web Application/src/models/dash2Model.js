var database = require("../database/config");

function listarComparacaoProducaoCafe(ano, idEmpresa) {
    let instrucaoSql = `
select
    em.estado,
    SUM(quantidadeColhida) toneladasColhidas,
    tc.nome
from plantacaoFazenda pf
inner join fazenda fz
on pf.fkFazenda = fz.id
inner join estadoMunicipio em
on pf.fazenda_fkEstadoMunicipio = em.id
inner join tipoCafe tc 
on fz.fkTipoCafe = tc.id
where fz.fkTipoCafe = 1 and pf.ano = 1985 and fz.fkEmpresa = 3
group by tc.nome, em.estado
union
select
    em.estado,
    SUM(quantidadeColhida) toneladasColhidas,
    tc.nome
from plantacaoFazenda pf
inner join fazenda fz
on pf.fkFazenda = fz.id
inner join estadoMunicipio em
on pf.fazenda_fkEstadoMunicipio = em.id
inner join tipoCafe tc 
on fz.fkTipoCafe = tc.id
where fz.fkTipoCafe = 2 and  pf.ano = ${ano} and f.fkEmpresa = ${idEmpresa}
group by tc.nome, em.estado
order by estado;
    `;

    return database.executar(instrucaoSql);
}
function obterCafeMaisEficiente(ano, idEmpresa) {
    let instrucaoSql = `
        select
    ROUND(SUM((areaPlantada * 38.74 * 60) / 1000), 2) especulacaoToneladasPlantadas,
    SUM(quantidadeColhida) toneladasColhidas,
    ROUND(((SUM(quantidadeColhida) * 100) / ROUND(SUM((areaPlantada * 38.74 * 60) / 1000), 0)), 2) percentualEfeciencia,
    tc.nome
from plantacaoFazenda pf
inner join fazenda f
on pf.fkFazenda = f.id
inner join estadoMunicipio em
on pf.fazenda_fkEstadoMunicipio = em.id
inner join tipoCafe tc
on f.fkTipoCafe = tc.id
where ano = ${ano} and f.fkEmpresa = ${idEmpresa}
group by tc.nome
order by toneladasColhidas desc
limit 1;
    `;

    return database.executar(instrucaoSql);
}

function obterCafeMenosEficiente(ano, idEmpresa) {
    let instrucaoSql = `
        select
	estado,
    ROUND(SUM((areaPlantada * 38.74 * 60) / 1000), 2) especulacaoToneladasPlantadas,
    SUM(quantidadeColhida) toneladasColhidas,
    ROUND(((SUM(quantidadeColhida) * 100) / ROUND(SUM((areaPlantada * 38.74 * 60) / 1000), 0)), 2) percentualEfeciencia,
    tc.nome
from plantacaoFazenda pf
inner join fazenda f
on pf.fkFazenda = f.id
inner join estadoMunicipio em
on pf.fazenda_fkEstadoMunicipio = em.id
inner join tipoCafe tc
on f.fkTipoCafe = tc.id
where ano = ${ano} and f.fkEmpresa = ${idEmpresa}
group by
estado, tc.nome
order by toneladasColhidas asc
limit 1;
    `;

    return database.executar(instrucaoSql);
}


function listarAnos(idEmpresa) {
    let instrucaoSql = `
        SELECT DISTINCT ano 
        FROM plantacaoFazenda pf
        INNER JOIN fazenda f 
        ON pf.fkFazenda = f.id
        WHERE f.fkEmpresa = ${idEmpresa}
        ORDER BY ano;
    `;
    return database.executar(instrucaoSql);  // Executa a consulta
}

module.exports = {
    listarComparacaoProducaoCafe,
    obterCafeMaisEficiente,
    obterCafeMenosEficiente,
    listarAnos
};