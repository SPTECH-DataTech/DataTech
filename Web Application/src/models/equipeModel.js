var database = require("../database/config");

function listarFuncionarios(idFazenda) {
  console.log("ACESSEI O EQUIPE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarFuncionarios():", idFazenda);

  var instrucaoSql = `SELECT fun.id,
fun.nome,
fun.email,
car.nomeCargo
FROM funcionario fun
JOIN cargo car ON fun.fkCargo = car.id
JOIN fazenda faz ON fun.fkFazenda = faz.id
WHERE faz.id = ${idFazenda};`;

  return database.executar(instrucaoSql);
}

function carregarCargos() {
  console.log("ACESSEI O EQUIPE MODEL - function carregarCargos():");

  const instrucaoSql = `SELECT id, nomeCargo FROM cargo`;

  return database.executar(instrucaoSql); 
}

function adicionar(idFazenda, idCargo, nome, cpf, email, senha) {
  console.log("ACESSEI O EQUIPE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adicionar():", idFazenda, idCargo, nome, cpf, email, senha );

  var instrucaoSql = `INSERT INTO funcionario (fkFazenda, fkCargo, nome, cpf, email, senha) 
  VALUES (${idFazenda}, ${idCargo}, '${nome}', '${cpf}', '${email}', '${senha}');`;

  return database.executar(instrucaoSql);
}

function excluir(idFuncionario) {
  console.log("ACESSEI O EQUIPE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluir():", idFuncionario);

  var instrucaoSql = `DELETE FROM funcionario WHERE id = ${idFuncionario};`;

  return database.executar(instrucaoSql);
}

function editar(idFuncionario, nome, email, idCargo) {
  console.log("ACESSEI O EQUIPE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar():", idFuncionario, nome, email, idCargo);

  var instrucaoSql = `UPDATE funcionario 
  SET fkCargo = ${idCargo}, 
  nome = '${nome}', 
  email = '${email}' WHERE id = ${idFuncionario};`;

  return database.executar(instrucaoSql);
}


module.exports = {
  listarFuncionarios,
  carregarCargos,
  adicionar,
  excluir,
  editar,
}