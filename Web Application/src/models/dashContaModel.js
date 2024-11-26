var database = require("../database/config");

function mostrarInformacoesConta(idUsuario) {
  console.log("ACESSEI O DASHCONTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function mostrarInformacoesConta():", idUsuario);

  var instrucaoSql = `SELECT 
    funcionario.nome,
    funcionario.cpf,
    funcionario.email,
    fazenda.nome AS nomeFazenda,
    cargo.nomeCargo
FROM 
    funcionario
LEFT JOIN fazenda 
    ON funcionario.fkFazenda = fazenda.id 
LEFT JOIN cargo 
    ON funcionario.fkCargo = cargo.id
WHERE 
    funcionario.id = ${idUsuario};`;

  return database.executar(instrucaoSql);
}

function alterarSenha(idUsuario, novaSenha){
  console.log("ACESSEI O DASHCONTA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function mostrarInformacoesConta():", idUsuario);

  var instrucaoSql = `
    UPDATE funcionario
  SET senha = '${novaSenha}'
  WHERE id = ${idUsuario};
  `
  return database.executar(instrucaoSql);
}

module.exports = {
    mostrarInformacoesConta,
    alterarSenha,
}