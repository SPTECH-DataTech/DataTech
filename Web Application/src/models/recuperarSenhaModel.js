var database = require('../database/config');

function verificarEmail(email) {
    console.log("ACESSEI O RECUPERAR SENHA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email)

    var instrucaoSql = `SELECT email FROM usuario WHERE email = '${email}'`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    verificarEmail
}