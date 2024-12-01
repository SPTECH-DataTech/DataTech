
var database = require('../database/config');

function listarEstados() {
    console.log("ACESSEI O FAZENDA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ");

    var instrucaoSql = `SELECT * FROM estadoMunicipio;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarTipoCafe() {
    console.log("ACESSEI O FAZENDA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ");

    var instrucaoSql = `SELECT * FROM tipoCafe;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function adicionarFazenda(nomeFazenda, tipoCafe, estadoMunicipio, idEmpresa) {
    console.log("ACESSEI O FAZENDA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", nomeFazenda, tipoCafe, estadoMunicipio, idEmpresa);

    var instrucaoSql = `INSERT INTO fazenda (nome, fkTipoCafe, fkEmpresa, fkEstadoMunicipio) 
                        VALUES ('${nomeFazenda}', ${tipoCafe}, '${idEmpresa}', '${estadoMunicipio}');`;

    console.log("Executando a instrução SQL para inserir a fazenda: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
        .then(() => {

            var instrucaoSql = `SELECT id FROM fazenda WHERE nome = '${nomeFazenda}' AND fkEmpresa = '${idEmpresa}'`;

            console.log("Executando a instrução SQL para verificar a fazenda: \n" + instrucaoSql);
            return database.executar(instrucaoSql);
        }).catch(error => {

            console.error("Erro ao adicionar fazenda ou tipoCafePlantacao:", error.message);
            throw error;
        });
}


function listarFazendas(empresa) {
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
    em.id AS id_municipio,
    tc.id,
    tc.nome AS tipo_cafe
FROM 
    datatech.fazenda f
LEFT JOIN 
    datatech.estadoMunicipio em ON f.fkEstadoMunicipio = em.id
LEFT JOIN 
    datatech.tipoCafe tc ON f.fkTipoCafe = tc.id
WHERE
    f.fkEmpresa = ${empresa};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function removerFazenda(idFazenda, idEmpresa, idEstadoMunicipio) {
    console.log("Removendo a fazenda com ID:", idFazenda, idEmpresa, idEstadoMunicipio);

    const instrucoesSql = [
        // Apenas a exclusão da fazenda
        `DELETE FROM datatech.fazenda WHERE id = '${idFazenda}';`
    ];

    let promiseSQL = Promise.resolve();

    instrucoesSql.forEach((instrucaoSql) => {
        promiseSQL = promiseSQL
            .then(() => {
                console.log("Executando a instrução SQL: \n" + instrucaoSql);
                return database.executar(instrucaoSql);
            })
            .catch((erro) => {
                console.error('Erro ao executar SQL:', erro);
            });
    });

    return promiseSQL
        .then(() => {
            console.log(`Fazenda com ID ${idFazenda} foi removida com sucesso.`);
        })
        .catch((erro) => {
            console.error('Houve um erro ao remover a fazenda:', erro);
        });
}


function editarFazenda(nomeFazenda, tipoCafe, estadoMunicipio, idFazenda) {
    console.log("ACESSEI O FAZENDA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", idFazenda, nomeFazenda, tipoCafe, estadoMunicipio);

    var instrucaoSql = `UPDATE fazenda SET nome = '${nomeFazenda}', fkEstadoMunicipio = '${estadoMunicipio}' WHERE id = '${idFazenda}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function listarPermissoes(idFuncionario) {
    console.log("ACESSEI O FAZENDA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", idFuncionario);

    var instrucaoSql = `SELECT 
            f.id AS funcionario_id,
            c.permissaoCargos,
            c.permissaoFazendas,
            c.permissaoFuncionarios
        FROM 
            datatech.funcionario f
        JOIN 
            datatech.cargo c ON f.fkCargo = c.id
        WHERE 
            f.id = '${idFuncionario}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    listarEstados,
    adicionarFazenda,
    listarFazendas,
    removerFazenda,
    editarFazenda,
    listarTipoCafe,
    listarPermissoes
}