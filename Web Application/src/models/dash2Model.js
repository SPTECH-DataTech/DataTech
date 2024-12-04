var database = require("../database/config");

function listarComparacaoProducaoCafe(idEmpresa, ano) {
    let instrucaoSql = `
        select
    em.estado nomeEstado,
    COALESCE(SUM(case when fz.fkTipoCafe = 1 then pf.quantidadeColhida else 0 end), 0) as arabica,
    COALESCE(SUM(case when fz.fkTipoCafe = 2 then pf.quantidadeColhida else 0 end), 0) as robusta
from plantacaoFazenda pf
inner join fazenda fz
    on pf.fkFazenda = fz.id
inner join estadoMunicipio em
    on pf.fazenda_fkEstadoMunicipio = em.id
inner join tipoCafe tc 
    on fz.fkTipoCafe = tc.id
where pf.ano = ${ano} 
    and fz.fkEmpresa = ${idEmpresa}
group by em.estado
order by 2 desc
limit 6;
    `;

    return database.executar(instrucaoSql);
}
function obterCafeMaisEficiente(idEmpresa, ano) {
    let instrucaoSql = `
     WITH TotalColhido AS (
    SELECT
        SUM(pf.quantidadeColhida) AS totalColhido
    FROM
        plantacaoFazenda pf
    INNER JOIN fazenda f
        ON pf.fkFazenda = f.id
    WHERE
        pf.ano = 1985
        AND f.fkEmpresa = 3
)
SELECT
    ROUND(SUM((pf.areaPlantada * 38.74 * 60) / 1000), 2) AS especulacaoToneladasPlantadas,
    SUM(pf.quantidadeColhida) AS toneladasColhidas,
    ROUND(
        (SUM(pf.quantidadeColhida) * 100) / (SELECT totalColhido FROM TotalColhido),
        2
    ) AS percentualEfeciencia,
    tc.nome AS nomeCafe
FROM
    plantacaoFazenda pf
INNER JOIN fazenda f
    ON pf.fkFazenda = f.id
INNER JOIN estadoMunicipio em
    ON pf.fazenda_fkEstadoMunicipio = em.id
INNER JOIN tipoCafe tc
    ON f.fkTipoCafe = tc.id
WHERE
    pf.ano = 1985
    AND f.fkEmpresa = 3
GROUP BY
    tc.nome
ORDER BY
    percentualEfeciencia DESC
LIMIT 1;
    `;

    return database.executar(instrucaoSql);
}

function obterCafeMenosEficiente(idEmpresa, ano) {
    let instrucaoSql = `
    WITH TotalColhido AS (
    SELECT
        SUM(pf.quantidadeColhida) AS totalColhido
    FROM
        plantacaoFazenda pf
    INNER JOIN fazenda f
        ON pf.fkFazenda = f.id
    WHERE
        pf.ano = 1985
        AND f.fkEmpresa = 3
)
SELECT
    ROUND(SUM((pf.areaPlantada * 38.74 * 60) / 1000), 2) AS especulacaoToneladasPlantadas,
    SUM(pf.quantidadeColhida) AS toneladasColhidas,
    ROUND(
        (SUM(pf.quantidadeColhida) * 100) / (SELECT totalColhido FROM TotalColhido),
        2
    ) AS percentualEfeciencia,
    tc.nome AS nomeCafe
FROM
    plantacaoFazenda pf
INNER JOIN fazenda f
    ON pf.fkFazenda = f.id
INNER JOIN estadoMunicipio em
    ON pf.fazenda_fkEstadoMunicipio = em.id
INNER JOIN tipoCafe tc
    ON f.fkTipoCafe = tc.id
WHERE
    pf.ano = 1985
    AND f.fkEmpresa = 3
GROUP BY
    tc.nome
ORDER BY
    percentualEfeciencia ASC
LIMIT 1;
    `;
    return database.executar(instrucaoSql);
}

function obterTop5(idEmpresa, ano) {
    let instrucaoSql = `
    select
	estado,
    ROUND(((SUM(quantidadeColhida * 100)) / ROUND(SUM((areaPlantada * 38.74 * 60) / 1000), 0)), 2) percentualEfeciencia,
    SUM(pf.quantidadeColhida) totalColhido
from plantacaoFazenda pf
inner join fazenda f
on pf.fkFazenda = f.id
inner join estadoMunicipio em
on pf.fazenda_fkEstadoMunicipio = em.id
where ano = ${ano} and f.fkEmpresa = ${idEmpresa}
group by
estado
order by totalColhido desc
limit 5;
    `;

    return database.executar(instrucaoSql);
}

function totalSafra(ano, idEmpresa) {
    let instrucaoSql = `
    select
    ROUND(SUM(pf.valorTotalReais), 2) totalSafra,
    tc.nome nomeCafe
from plantacaoFazenda pf
inner join fazenda f
on pf.fkFazenda = f.id
inner join estadoMunicipio em
on pf.fazenda_fkEstadoMunicipio = em.id
inner join tipoCafe tc
on f.fkTipoCafe = tc.id
where ano = ${ano} and f.fkEmpresa = ${idEmpresa}
group by tc.nome
order by totalSafra desc;
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
    obterTop5,
    totalSafra,
    listarAnos
};