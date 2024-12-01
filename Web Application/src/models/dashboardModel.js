var database = require("../database/config");

function listarProducaoCafe(ano, tipoCafe) {
    let instrucaoSql = `
        select 
            em.estado as estado,
            round(sum((pf.areaplantada * 39 * 60) / 1000), 0) as toneladasplantadas,
            sum(pf.quantidadecolhida) as toneladascolhidas
        from plantacaofazenda as pf
        inner join fazenda f on pf.fkfazenda = f.id
        inner join estadomunicipio em on f.fkestadomunicipio = em.id
        where pf.ano = ${ano} and f.fktipocafe = ${tipocafe}
        group by em.estado
        order by toneladascolhidas desc
        limit 5;
    `;

    return database.executar(instrucaoSql);
}
function obterMaiorEficiencia(ano, tipoCafe) {
    let instrucaoSql = `
        select 
            em.estado as estado,
            round(sum((pf.areaplantada * 39 * 60) / 1000), 0) as quantidadeplantada,  -- quantidade plantada em toneladas
            round(sum((pf.areaplantada * 39 * 60) / 1000) - sum(pf.quantidadecolhida), 0) as quantidadeperdida, -- quantidade perdida em toneladas
            round(
                ((sum((pf.areaplantada * 39 * 60) / 1000) - sum(pf.quantidadecolhida)) / 
                sum((pf.areaplantada * 39 * 60) / 1000)) * 100, 2
            ) as porcentagemperda
        from plantacaofazenda as pf
        inner join fazenda f on pf.fkfazenda = f.id
        inner join estadomunicipio em on f.fkestadomunicipio = em.id
        where pf.ano = ${ano} and f.fktipocafe = ${tipocafe}
        group by em.estado
        order by porcentagemperda asc
        limit 1;
    `;

    return database.executar(instrucaoSql);
}

function obterMenorEficiencia(ano, tipoCafe) {
    let instrucaoSql = `
        select 
        em.estado as estado,
        round(sum((pf.areaplantada * 39 * 60) / 1000), 0) as quantidadeplantada,  -- quantidade plantada em toneladas
        round(sum((pf.areaplantada * 39 * 60) / 1000) - sum(pf.quantidadecolhida), 0) as quantidadeperdida, -- quantidade perdida em toneladas
        round(
            ((sum((pf.areaplantada * 39 * 60) / 1000) - sum(pf.quantidadecolhida)) / 
            sum((pf.areaplantada * 39 * 60) / 1000)) * 100, 2
        ) as porcentagemperda  
        from plantacaofazenda as pf
        inner join fazenda f on pf.fkfazenda = f.id
        inner join estadomunicipio em on f.fkestadomunicipio = em.id
        where pf.ano = ${ano} and f.fktipocafe = ${tipocafe}
        group by em.estado
        order by porcentagemperda desc 
        limit 1; 
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    listarProducaoCafe,
    obterMaiorEficiencia,
    obterMenorEficiencia
};

