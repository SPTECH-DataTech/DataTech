var database = require("../database/config");

function listar() {
  var instrucaoSql = `SELECT id, razao_social, cnpj, token FROM empresa`;

  return database.executar(instrucaoSql);
}


function cadastrar(razaoSocial, cnpj) {
  var instrucaoSql = `INSERT INTO empresa (razao_social, cnpj) VALUES ('${razaoSocial}', '${cnpj}')`;

  return database.executar(instrucaoSql);
}

module.exports = {cadastrar, listar };
