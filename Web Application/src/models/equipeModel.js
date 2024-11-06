var database = require("../database/config")

function listarFuncionarios(idEmpresa) {
  console.log("ACESSEI O EQUIPE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarFuncionarios():");

  var instrucaoSql = `SELECT nome, email, cargo FROM usuario WHERE fkEmpresa = ${idEmpresa}`;

  return database.executar(instrucaoSql);
}

function excluirFuncionarios(idEmpresa, nome) {
  console.log("ACESSEI O EQUIPE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirFuncionarios():");

  var instrucaoSql = `DELETE FROM usuario WHERE fkEmpresa = ${idEmpresa} AND nome = '${nome}'`;

  return database.executar(instrucaoSql);
}


module.exports = {
  listarFuncionarios,
  excluirFuncionarios,
}