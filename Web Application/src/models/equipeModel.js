var database = require("../database/config")

function listarFuncionarios(idEmpresa) {
  var instrucaoSql = `SELECT nome, email, cargo FROM usuario WHERE fk_empresa = ${idEmpresa}`;

  return database.executar(instrucaoSql);
}

module.exports = {
  listarFuncionarios,
}