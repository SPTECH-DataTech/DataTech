
var database = require('../database/config');

function listarEstados() {
    console.log("ACESSEI O FAZENDA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ");

    var instrucaoSql = `SELECT * FROM estadoMunicipio;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function adicionarFazenda(nomeFazenda, tipoCafe, estadoMunicipio, idEmpresa) {
    console.log("ACESSEI O FAZENDA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", nomeFazenda, tipoCafe, estadoMunicipio, idEmpresa);

    var instrucaoSql = `INSERT INTO fazenda (nome, fkEmpresa, fkEstadoMunicipio) VALUES ( '${nomeFazenda}', '${estadoMunicipio}', '${idEmpresa}');`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarFazendas() {
    console.log("ACESSEI O FAZENDA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ");

    // var instrucaoSql = ` SELECT faz.*, em.estado AS estado
    // FROM fazenda faz
    // JOIN EstadoMunicipio em ON faz.fkEstadosMunicipio = em.id;`;


    var instrucaoSql = `
    SELECT 
        f.*,  
        em.estado, 
        em.municipio,
        em.idUf AS id_uf, 
        em.idMunicipio AS id_municipio
    FROM 
        datatech.fazenda f
    INNER JOIN 
        datatech.estadoMunicipio em
    ON 
        f.fkEstadoMunicipio = em.id;`;
        
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function removerFazenda(idFazenda) {
    console.log("ACESSEI O FAZENDA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", idFazenda);

    var instrucaoSql = `DELETE FROM fazenda WHERE id = '${idFazenda}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editarFazenda(nomeFazenda, tipoCafe, estadoMunicipio, idFazenda) {
    console.log("ACESSEI O FAZENDA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", idFazenda, nomeFazenda, tipoCafe, estadoMunicipio);

    var instrucaoSql = `UPDATE fazenda SET nome = '${nomeFazenda}', fkEstadoMunicipio = '${estadoMunicipio}' WHERE id = '${idFazenda}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    listarEstados,
    adicionarFazenda,
    listarFazendas,
    removerFazenda,
    editarFazenda
}