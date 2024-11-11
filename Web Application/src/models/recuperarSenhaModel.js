// var database = require('../database/config');

// function verificarEmail(email) {
//     console.log("ACESSEI O RECUPERAR SENHA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email)

//     var instrucaoSql = `SELECT email, id FROM usuario WHERE email = '${email}'`;

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }


// function atualizarSenha(senha, id) {
//     console.log("ACESSEI O RECUPERAR SENHA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", senha, id)

//     var instrucaoSql = `UPDATE usuario SET senha = '${senha}' WHERE id = '${id}';`;

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

// module.exports = {
//     verificarEmail,
//     atualizarSenha
// }