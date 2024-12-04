var database = require("../database/config");

function listarProducaoCafe(ano, tipoCafe, idEmpresa) {
    let instrucaoSql = `
 select 
            em.estado as estado,
            round(sum((pf.areaplantada * 39 * 60) / 1000), 0) as toneladasPlantadas,
            sum(pf.quantidadecolhida) as toneladasColhidas
        from plantacaoFazenda as pf
        inner join fazenda f on pf.fkFazenda = f.id
        inner join estadoMunicipio em on f.fkEstadoMunicipio = em.id
        where pf.ano = ${ano} and f.fkTipoCafe = ${tipoCafe} and pf.fazenda_fkEmpresa = ${idEmpresa}
        group by em.estado
        order by toneladasColhidas desc
        limit 5;
    `;

    return database.executar(instrucaoSql);
}
function obterMaiorEficiencia(ano, tipoCafe, idEmpresa) {
    let instrucaoSql = `

    select 
    em.estado as estado,
    round(sum((pf.areaplantada * 39 * 60) / 1000), 2) as quantidadePlantada, -- quantidade plantada em toneladas
    round(sum(pf.quantidadecolhida), 2) as quantidadeColhida, -- quantidade efetivamente colhida em toneladas
    round(
        (sum(pf.quantidadecolhida) / sum((pf.areaplantada * 39 * 60) / 1000)) * 100, 2
    ) as porcentagemGanho
    from plantacaoFazenda as pf
    inner join fazenda f on pf.fkfazenda = f.id
    inner join estadoMunicipio em on f.fkestadomunicipio = em.id 
    where pf.ano = ${ano} and f.fkTipoCafe = ${tipoCafe} and pf.fazenda_fkEmpresa = ${idEmpresa}
    group by em.estado
    order by porcentagemGanho desc
    limit 1;

    `;

    return database.executar(instrucaoSql);
}

function obterMenorEficiencia(ano, tipoCafe, idEmpresa) {
    let instrucaoSql = `
        select 
        em.estado as estadoMenor,
        round(sum((pf.areaplantada * 39 * 60) / 1000), 2) as quantidadePlantadaMenor,  
        round(sum((pf.areaplantada * 39 * 60) / 1000) - sum(pf.quantidadecolhida), 2) as quantidadePerdidaMenor,
        round(
            ((sum((pf.areaplantada * 39 * 60) / 1000) - sum(pf.quantidadecolhida)) / 
            sum((pf.areaplantada * 39 * 60) / 1000)) * 100, 2
        ) as porcentagemPerdaMenor  
        from plantacaoFazenda as pf
        inner join fazenda f on pf.fkFazenda = f.id
        inner join estadoMunicipio em on f.fkEstadoMunicipio = em.id
        where pf.ano = ${ano} and f.fktipocafe = ${tipoCafe} and pf.fazenda_fkEmpresa = ${idEmpresa}
        group by em.estado
        order by porcentagemPerdaMenor desc 
        limit 1; 
    `;

    return database.executar(instrucaoSql);
}


function listarAnos(idEmpresa) {
    let instrucaoSql = `
        SELECT DISTINCT ano 
        FROM plantacaoFazenda
        where fazenda_fkEmpresa = ${idEmpresa}
        ORDER BY ano;
    ;
    `;
    return database.executar(instrucaoSql);  // Executa a consulta
}


function listarTiposDeCafe(idEmpresa) {
    let instrucaoSql = `
        SELECT DISTINCT 
            tc.id as idCafe,
            tc.nome as nomeCafe
        FROM datatech.tipoCafe tc
        INNER JOIN datatech.fazenda f ON tc.id = f.fkTipoCafe
        INNER JOIN plantacaoFazenda pf ON pf.fkFazenda = f.id
        WHERE f.fkEmpresa = ${idEmpresa};
    `;
    return database.executar(instrucaoSql);
}


function listarEstados() {
    let instrucaoSql = `
        SELECT DISTINCT 
            em.idUf, 
            em.estado
        FROM 
            climaMunicipioDash2 AS cm
        INNER JOIN 
            estadoMunicipio AS em ON cm.fkMunicipio = em.id
        ORDER BY 
            em.estado;
    `;
    
    return database.executar(instrucaoSql);
}

function listarClimogramaPorAno(ano, idUf) {
    let instrucaoSql = `
  SELECT 
    mes, 
    AVG(temperaturaMedia) AS temperaturaMedia, 
    AVG(umidadeMedia) AS umidadeMedia
FROM (
    SELECT
        CASE 
            WHEN MONTH(cmd.dataCaptura) = 1 THEN 'Jan'
            WHEN MONTH(cmd.dataCaptura) = 2 THEN 'Fev'
            WHEN MONTH(cmd.dataCaptura) = 3 THEN 'Mar'
            WHEN MONTH(cmd.dataCaptura) = 4 THEN 'Abr'
            WHEN MONTH(cmd.dataCaptura) = 5 THEN 'Mai'
            WHEN MONTH(cmd.dataCaptura) = 6 THEN 'Jun'
            WHEN MONTH(cmd.dataCaptura) = 7 THEN 'Jul'
            WHEN MONTH(cmd.dataCaptura) = 8 THEN 'Ago'
            WHEN MONTH(cmd.dataCaptura) = 9 THEN 'Set'
            WHEN MONTH(cmd.dataCaptura) = 10 THEN 'Out'
            WHEN MONTH(cmd.dataCaptura) = 11 THEN 'Nov'
            WHEN MONTH(cmd.dataCaptura) = 12 THEN 'Dez'
        END AS mes,
        (cmd.temperaturaMax + cmd.temperaturaMin) / 2 AS temperaturaMedia,
        cmd.umidadeMedia
    FROM 
        climaMunicipioDash2 AS cmd
    INNER JOIN 
        estadoMunicipio AS em ON cmd.fkMunicipio = em.id
    WHERE 
        em.idUf = ${idUf} AND YEAR(cmd.dataCaptura) = ${ano}
) AS subquery
GROUP BY 
    mes
ORDER BY 
    FIELD(mes, 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez');

    `;
    return database.executar(instrucaoSql);
}


function listarClimaInadequado(ano, idUf) {
    let instrucaoSql = `
    SELECT 
        MONTH(cmd.dataCaptura) AS mes,
        AVG((cmd.temperaturaMax + cmd.temperaturaMin) / 2) AS temperaturaMedia,
        AVG(cmd.umidadeMedia) AS umidadeMedia
    FROM climaMunicipioDash2 cmd
    INNER JOIN estadoMunicipio em ON cmd.fkMunicipio = em.id 
    WHERE YEAR(cmd.dataCaptura) = ${ano} AND em.idUf = ${idUf}
    GROUP BY YEAR(cmd.dataCaptura), MONTH(cmd.dataCaptura)
    HAVING 
        (temperaturaMedia < 18 OR temperaturaMedia > 24) 
        AND (umidadeMedia < 60 OR umidadeMedia > 80);
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    listarProducaoCafe,
    obterMaiorEficiencia,
    obterMenorEficiencia,
    listarAnos,
    listarTiposDeCafe,
    listarEstados,
    listarClimogramaPorAno,
    listarClimaInadequado
};

