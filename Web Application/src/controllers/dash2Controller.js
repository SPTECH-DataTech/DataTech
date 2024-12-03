const dash2Model = require("../models/dash2Model");

function listarComparacaoProducaoCafe(req, res) {
    let ano = req.body.anoServer;

    if (ano == undefined) {
        res.status(400).send("Ano está undefined");
    } else {
        dash2Model.listarComparacaoProducaoCafe(ano)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`);
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao consultar a comparação da produção de café", erro.sqlMessage);
                    res.status(500).json({ erro: "Houve um erro ao consultar a comparação da produção de café", erro: erro.sqlMessage });
                }
            );
    }
}

function obterCafeMaisEficiente(req, res) {
    let ano = req.body.anoServer;

    if (ano == undefined) {
        res.status(400).send("Ano está undefined");
    } else {
        dash2Model.obterCafeMaisEficiente(ano)
            .then(
                function (resultado) {
                    if (resultado && resultado.length > 0) {
                        let estado = resultado[0].estado;
                        let quantidadePlantada = resultado[0].quantidadePlantada;
                        let quantidadePerdida = resultado[0].quantidadePerdida;
                        let porcentagemPerda = resultado[0].porcentagemPerda;

                        res.json({
                            estado: estado,
                            quantidadePlantada: quantidadePlantada,
                            quantidadePerdida: quantidadePerdida,
                            porcentagemPerda: porcentagemPerda
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

function obterCafeMenosEficiente(req, res) {
    let ano = req.body.anoServer;

    if (ano == undefined) {
        res.status(400).send("Ano está undefined");
    } else {
        dash2Model.obterCafeMenosEficiente(ano)
            .then(
                function (resultado) {
                    if (resultado && resultado.length > 0) {
                        let estado = resultado[0].estado;
                        let quantidadePlantada = resultado[0].quantidadePlantada;
                        let quantidadePerdida = resultado[0].quantidadePerdida;
                        let porcentagemPerda = resultado[0].porcentagemPerda;

                        res.json({
                            estado: estado,
                            quantidadePlantada: quantidadePlantada,
                            quantidadePerdida: quantidadePerdida,
                            porcentagemPerda: porcentagemPerda
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
    const idEmpresa =  req.params.idEmpresa;
    dash2Model.listarAnos(idEmpresa).then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!")
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }

module.exports = {
    listarComparacaoProducaoCafe,
    obterCafeMaisEficiente,
    obterCafeMenosEficiente,
    listarAnos
};

