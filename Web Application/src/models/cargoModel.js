var database = require("../database/config")

function listarCargos(fkEmpresa) {
    let instrucaoSql = `
        SELECT * FROM cargos WHERE fkEmpresa = ${fkEmpresa};
    `;

    return database.executar(instrucaoSql)
}

module.exports = {
    listarCargos
};