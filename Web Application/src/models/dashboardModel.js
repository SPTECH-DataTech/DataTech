var database = require("../database/config");

function listarProducaoCafe(ano, tipoCafe) {
    let instrucaoSql = `
 select 
            em.estado as estado,
            round(sum((pf.areaplantada * 39 * 60) / 1000), 0) as toneladasPlantadas,
            sum(pf.quantidadecolhida) as toneladasColhidas
        from plantacaoFazenda as pf
        inner join fazenda f on pf.fkFazenda = f.id
        inner join estadoMunicipio em on f.fkEstadoMunicipio = em.id
        where pf.ano = ${ano} and f.fkTipoCafe = ${tipoCafe} and pf.fazenda_fkEmpresa = 3
        group by em.estado
        order by toneladasColhidas desc
        limit 5;
    `;

    return database.executar(instrucaoSql);
}
function obterMaiorEficiencia(ano, tipoCafe) {
    let instrucaoSql = `
         select 
            em.estado as estado,
            round(sum((pf.areaplantada * 39 * 60) / 1000), 0) as quantidadePlantada,  -- quantidade plantada em toneladas
            round(sum((pf.areaplantada * 39 * 60) / 1000) - sum(pf.quantidadecolhida), 0) as quantidadePerdida, -- quantidade perdida em toneladas
            round(
                ((sum((pf.areaplantada * 39 * 60) / 1000) - sum(pf.quantidadecolhida)) / 
                sum((pf.areaplantada * 39 * 60) / 1000)) * 100, 2
            ) as porcentagemPerda
        from plantacaoFazenda as pf
        inner join fazenda f on pf.fkfazenda = f.id
        inner join estadoMunicipio em on f.fkestadomunicipio = em.id 
        where pf.ano = ${ano} and  f.fkTipoCafe = ${tipoCafe} and pf.fazenda_fkEmpresa = 3
        group by em.estado
        order by porcentagemPerda asc
        limit 1;
    `;

    return database.executar(instrucaoSql);
}

function obterMenorEficiencia(ano, tipoCafe) {
    let instrucaoSql = `
        select 
        em.estado as estadoMenor,
        round(sum((pf.areaplantada * 39 * 60) / 1000), 0) as quantidadePlantadaMenor,  
        round(sum((pf.areaplantada * 39 * 60) / 1000) - sum(pf.quantidadecolhida), 0) as quantidadePerdidaMenor,
        round(
            ((sum((pf.areaplantada * 39 * 60) / 1000) - sum(pf.quantidadecolhida)) / 
            sum((pf.areaplantada * 39 * 60) / 1000)) * 100, 2
        ) as porcentagemPerdaMenor  
        from plantacaoFazenda as pf
        inner join fazenda f on pf.fkFazenda = f.id
        inner join estadoMunicipio em on f.fkEstadoMunicipio = em.id
        where pf.ano = ${ano} and f.fktipocafe = ${tipoCafe} and pf.fazenda_fkEmpresa = 3
        group by em.estado
        order by porcentagemPerdaMenor desc 
        limit 1; 
    `;

    return database.executar(instrucaoSql);
}


function listarAnos() {
    let instrucaoSql = `
        SELECT DISTINCT ano 
        FROM plantacaoFazenda
        where fazenda_fkEmpresa = 3
        ORDER BY ano;
    ;
    `;
    return database.executar(instrucaoSql);  // Executa a consulta
}


function listarTiposDeCafe() {
    let instrucaoSql = `
        SELECT DISTINCT 
            tc.id as idCafe,
            tc.nome as nomeCafe
        FROM datatech.tipoCafe tc
        INNER JOIN datatech.fazenda f ON tc.id = f.fkTipoCafe
        INNER JOIN plantacaoFazenda pf ON pf.fkFazenda = f.id
        WHERE f.fkEmpresa = 3;
    `;
    return database.executar(instrucaoSql);
}



module.exports = {
    listarProducaoCafe,
    obterMaiorEficiencia,
    obterMenorEficiencia,
    listarAnos,
    listarTiposDeCafe
};

