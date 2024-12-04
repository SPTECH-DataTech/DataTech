var dashboardModel = require("../models/dashboardModel");

function listarProducaoCafe(req, res) {
    let ano = req.body.anoServer;
    let tipoCafe = req.body.tipoCafeServer;
    let idEmpresa = req.body.idEmpresa;

    if (!idEmpresa) {
        res.status(400).send("ID da empresa não fornecido");
        return;
    }
    if (ano == undefined) {
        res.status(400).send("Ano está undefined");
    } else if (tipoCafe == undefined) {
        res.status(400).send("Tipo de café está undefined");
    } else {
        dashboardModel.listarProducaoCafe(ano, tipoCafe, idEmpresa)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao consultar a produção de café", erro.sqlMessage);
                    res.status(500).json({ erro: "Houve um erro ao consultar a produção de café", erro: erro.sqlMessage });
                }
            );
    }
}

function obterMaiorEficiencia(req, res) {
    let ano = req.body.anoServer;
    let tipoCafe = req.body.tipoCafeServer;
    let idEmpresa = req.body.idEmpresa;

    if (!idEmpresa) {
        res.status(400).send("ID da empresa não fornecido");
        return;
    }
    if (ano == undefined) {
        res.status(400).send("Ano está undefined");
    } else if (tipoCafe == undefined) {
        res.status(400).send("Tipo de café está undefined");
    } else {
        dashboardModel.obterMaiorEficiencia(ano, tipoCafe, idEmpresa)
            .then(
                function (resultado) {
                    if (resultado && resultado.length > 0) {
                        let estado = resultado[0].estado;
                        let quantidadePlantada = resultado[0].quantidadePlantada;
                        let quantidadeColhida = resultado[0].quantidadeColhida;
                        let porcentagemGanho = resultado[0].porcentagemGanho;

                        res.json({
                            estado: estado,
                            quantidadePlantada: quantidadePlantada,
                            quantidadeColhida: quantidadeColhida,
                            porcentagemGanho: porcentagemGanho
                        });
                    } else {
                        res.status(404).send("Nenhum resultado encontrado.");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json({ erro: "Erro ao consultar dados", erroDetalhado: erro.sqlMessage });
                }
            );
    }
}

function obterMenorEficiencia(req, res) {
    let ano = req.body.anoServer;
    let tipoCafe = req.body.tipoCafeServer;
    let idEmpresa = req.body.idEmpresa;

    if (!idEmpresa) {
        res.status(400).send("ID da empresa não fornecido");
        return;
    }
    if (ano == undefined) {
        res.status(400).send("Ano está undefined");
    } else if (tipoCafe == undefined) {
        res.status(400).send("Tipo de café está undefined");
    } else {
        dashboardModel.obterMenorEficiencia(ano, tipoCafe, idEmpresa)
            .then(
                function (resultado) {
                    if (resultado && resultado.length > 0) {
                        let estadoMenor = resultado[0].estadoMenor;
                        let quantidadePlantadaMenor = resultado[0].quantidadePlantadaMenor;
                        let quantidadePerdidaMenor = resultado[0].quantidadePerdidaMenor;
                        let porcentagemPerdaMenor = resultado[0].porcentagemPerdaMenor;

                        res.json({
                            estadoMenor: estadoMenor,
                            quantidadePlantadaMenor: quantidadePlantadaMenor,
                            quantidadePerdidaMenor: quantidadePerdidaMenor,
                            porcentagemPerdaMenor: porcentagemPerdaMenor
                        });
                    } else {
                        res.status(404).send("Nenhum resultado encontrado.");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json({ erro: "Erro ao consultar dados", erroDetalhado: erro.sqlMessage });
                }
            );
    }
}

function listarAnos(req, res) {
    var idEmpresa = req.params.idEmpresa;

    dashboardModel.listarAnos(idEmpresa)
        .then(function (resultado) {
            if (resultado && resultado.length > 0) {
                res.json(resultado);  // Retorna os anos encontrados
            } else {
                res.status(404).send("Nenhum ano encontrado.");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json({ erro: "Erro ao consultar anos", erroDetalhado: erro.sqlMessage });
        });
}


function listarTiposDeCafe(req, res) {
    var idEmpresa = req.params.idEmpresa;
    dashboardModel.listarTiposDeCafe(idEmpresa)
        .then(function (resultado) {
            if (resultado && resultado.length > 0) {
                res.json(resultado); // Retorna os tipos de café
            } else {
                res.status(404).send("Nenhum tipo de café encontrado.");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json({ erro: "Erro ao consultar tipos de café", erroDetalhado: erro.sqlMessage });
        });
}

function listarEstados(req, res) {
    dashboardModel.listarEstados()
        .then(function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`);
            if (resultado && resultado.length > 0) {
                res.json(resultado);  // Retorna a lista de estados
            } else {
                res.status(404).json({ erro: "Nenhum estado encontrado" });
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao consultar os estados", erro.sqlMessage);
            res.status(500).json({ erro: "Houve um erro ao consultar os estados", erro: erro.sqlMessage });
        });
}

function listarClimogramaPorAno(req, res) {
    let ano = req.body.anoServer;
    let estado = req.body.estadoServer;
  
    if (ano == undefined || estado == undefined) {
        res.status(400).send("Ano ou estado está undefined");
        return;
    }

    dashboardModel.listarClimogramaPorAno(ano, estado)
        .then(function(resultado) {
            if (resultado.length === 0) {
                console.log("Nenhum dado encontrado para o ano e município:", ano, estado);
                res.status(404).json({ erro: "Nenhum dado encontrado" });
            } else {
                console.log("Dados encontrados:", resultado);
                res.json(resultado);
            }
        })
        .catch(function(erro) {
            console.error("Erro na consulta ao banco de dados:", erro);
            res.status(500).json({ erro: "Erro ao consultar os dados do climograma", erro: erro.sqlMessage });
        });
}

function listarClimaInadequado(req, res) {
    let ano = req.body.anoServer;
    let estado = req.body.estado;

    console.log(`Ano: ${ano}, estado: ${estado}`);  // Adicionando para depuração

    if (ano == undefined) {
        res.status(400).send("Ano está undefined");
    } else if (estado == undefined) {
        res.status(400).send("Estado está undefined");
    } else {
        dashboardModel.listarClimaInadequado(ano, estado)
            .then(function (resultado) {
                console.log(`Resultados encontrados: ${resultado.length}`);  // Verifique o tamanho do resultado
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao consultar o clima inadequado", erro.sqlMessage);
                res.status(500).json({ erro: "Houve um erro ao consultar o clima inadequado", erro: erro.sqlMessage });
            });
    }
}


module.exports = {
    listarProducaoCafe,
    obterMaiorEficiencia,
    obterMenorEficiencia,
    listarAnos,
    listarTiposDeCafe,
    listarEstados,
    listarClimogramaPorAno,
    listarClimaInadequado
};

