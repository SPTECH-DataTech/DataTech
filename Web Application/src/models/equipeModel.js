var database = require("../database/config")

function listarFuncionarios(idEmpresa, idFazenda) {
  console.log("ACESSEI O EQUIPE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarFuncionarios():", idEmpresa, idfazenda);

  var instrucaoSql = `SELECT fun.nome,
                      fun.email,
                      car.nomeCargo
                      FROM funcionario fun
                      JOIN cargo car ON fun.fkCargo = car.id
                      JOIN fazenda faz ON fun.fkFazenda = faz.id
                      WHERE faz.fkEmpresa = 1
                      AND fun.fkFazenda = 2;`;

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