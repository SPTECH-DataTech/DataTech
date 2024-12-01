var database = require("../database/config")

function listarCargos(fkEmpresa) {
    let instrucaoSql = `
        SELECT * FROM cargo WHERE fkFazenda = ${fkEmpresa};
    `;

    return database.executar(instrucaoSql)
}

function adicionarCargo(nomeCargo, permissaoCargos, permissaoFazendas, permissaoFuncionarios, fkFazenda, empresa, municipio) {
    let instrucaoSql = `

        INSERT INTO cargo (nomeCargo, permissaoCargos, permissaoFazendas, permissaoFuncionarios, fkFazenda, fazenda_fkEmpresa, fazenda_fkEstadoMunicipio) VALUES ("${nomeCargo}", ${permissaoCargos} ,${permissaoFazendas} ,${permissaoFuncionarios}, ${fkFazenda}, ${empresa}, ${municipio});
        `;

    return database.executar(instrucaoSql)
}

function removerCargos(listaIdsCargos) {
    for (i = 0; i < listaIdsCargos.length; i++) {
        let instrucaoSql = `
            DELETE FROM cargo WHERE id = ${listaIdsCargos[i]};
        `;
        database.executar(instrucaoSql);
    }
}

function editarCargo(id, nome, permissaoCargos, permissaoFazendas, permissaoFuncionarios, fazenda) {
    let instrucaoSql = `
        UPDATE cargo
        SET nomeCargo = "${nome}",
        permissaoCargos  = ${permissaoCargos},
        permissaoFazendas = ${permissaoFazendas},
        permissaoFuncionarios = ${permissaoFuncionarios}
        WHERE id = ${id} and fkFazenda = ${fazenda}
    `;
    database.executar(instrucaoSql);
}

function consultarFazenda(idFazenda) {
    let instrucaoSql = `
        SELECT nome FROM fazenda WHERE idFazenda = ${idFazenda};
    `;

    return database.executar(instrucaoSql)
}

module.exports = {
    listarCargos,
    adicionarCargo,
    removerCargos,
    editarCargo
};
