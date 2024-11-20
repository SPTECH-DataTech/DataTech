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

function removerCargos(listaIdsCargos) {
    for (i = 0; i < listaIdsCargos.length; i++) {
        let instrucaoSql = `
            DELETE FROM cargos WHERE id = ${listaIdsCargos[i]}
        `;
        database.executar(instrucaoSql);
    }
}

module.exports = {
    listarCargos,
    adicionarCargo,
    removerCargos
};