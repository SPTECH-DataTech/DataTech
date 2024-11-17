var database = require("../database/config")

function listarCargos(fkEmpresa) {
    let instrucaoSql = `
        SELECT * FROM cargos WHERE fkFazenda = ${fkEmpresa};
    `;

    return database.executar(instrucaoSql)
}

function adicionarCargo(nomeCargo, permissaoCargos, permissaoFazendas, permissaoFuncionarios, fkFazenda) {
    let instrucaoSql = `
        INSERT INTO cargos (nomeCargo, permissaoCargos, permissaoFazenda, permissaoFuncionarios, fkFazenda) VALUES ("${nomeCargo}", ${permissaoCargos} ,${permissaoFazendas} ,${permissaoFuncionarios}, ${fkFazenda});
    `;

    return database.executar(instrucaoSql)
}

module.exports = {
    listarCargos,
    adicionarCargo
};