var database = require("../database/config");

function listarFuncionarios() {
  console.log("ACESSEI O EQUIPE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarFuncionarios():");

  var instrucaoSql = `SELECT fun.id,
fun.nome,
fun.email,
car.nomeCargo
FROM funcionario fun
JOIN cargo car ON fun.fkCargo = car.id
JOIN fazenda faz ON fun.fkFazenda = faz.id
WHERE faz.id = 1;`;

  return database.executar(instrucaoSql);
}

function carregarCargos() {
  console.log("ACESSEI O EQUIPE MODEL - function carregarCargos():");

  const instrucaoSql = `SELECT id, nomeCargo FROM cargo`;

  return database.executar(instrucaoSql); 
}

function adicionar(idCargo, nome, cpf, email, senha) {
  console.log("ACESSEI O EQUIPE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adicionar():", idCargo,  nome, cpf, email, senha );

  var instrucaoSql = `INSERT INTO funcionario (fkFazenda, fkCargo, nome, cpf, email, senha) 
  VALUES (1, ${idCargo}, '${nome}', '${cpf}', '${email}', '${senha}');`;

  return database.executar(instrucaoSql);
}

function excluir(idUsuario) {
  console.log("ACESSEI O EQUIPE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluir():", idUsuario);

  var instrucaoSql = `DELETE fun
FROM funcionario fun
JOIN fazenda faz ON fun.fkFazenda = faz.id
WHERE fun.id = ${idUsuario};`;

  return database.executar(instrucaoSql);
}

function editar(idUsuario, nome, email, idCargo) {
  console.log("ACESSEI O EQUIPE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar():", idUsuario, nome, email, idCargo);

  var instrucaoSql = `UPDATE funcionario 
  SET fkCargo = ${idCargo}, 
  nome = '${nome}', 
  email = '${email}' WHERE id = ${idUsuario};`;

  return database.executar(instrucaoSql);
}


module.exports = {
  listarFuncionarios,
  carregarCargos,
  adicionar,
  excluir,
  editar,
}