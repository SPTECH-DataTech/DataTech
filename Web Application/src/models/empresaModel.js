var database = require("../database/config");

function listar() {
  var instrucaoSql = `SELECT 
    t.id AS token_id,
    t.token,
    e.id AS empresa_id,
    e.nomeEmpresa AS empresa_nome,
    hte.dataHistoricoToken AS data_associacao,
    hte.descricao
FROM 
    datatech.token AS t
INNER JOIN 
    datatech.historicoTokenEmpresa AS hte ON t.id = hte.fkToken
INNER JOIN 
    datatech.empresa AS e ON hte.fkEmpresa = e.id;`;

  return database.executar(instrucaoSql);
}


function cadastrar(razaoSocial, cnpj) {
  var instrucaoSql = `INSERT INTO empresa (razao_social, cnpj) VALUES ('${razaoSocial}', '${cnpj}')`;

  return database.executar(instrucaoSql);
}

module.exports = { cadastrar, listar };
