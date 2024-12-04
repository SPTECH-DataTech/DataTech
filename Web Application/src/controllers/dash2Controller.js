const dash2Model = require("../models/dash2Model");

function listarComparacaoProducaoCafe(req, res) {
    const idEmpresa =  req.params.idEmpresa;
    const ano = req.params.ano;

    dash2Model.listarComparacaoProducaoCafe(idEmpresa, ano).then(function (resultado) {
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

// function obterCafeMaisEficiente(req, res) {
//     const idEmpresa =  req.params.idEmpresa;
//     const ano = req.params.anoServer;

//     if (ano == undefined) {
//         res.status(400).send("Ano está undefined");
//     } else {
//         dash2Model.obterCafeMaisEficiente(idEmpresa, ano)
//             .then(
//                 function (resultado) {
//                     if (resultado && resultado.length > 0) {
//                         let especulacaoToneladasPlantadas = resultado[0].especulacaoToneladasPlantadas;
//                         let toneladasColhidas = resultado[0].toneladasColhidas;
//                         let percentualEfeciencia = resultado[0].percentualEfeciencia;
//                         let nome = resultado[0].nome;

//                         res.json({
//                             especulacaoToneladasPlantadas: especulacaoToneladasPlantadas,
//                             toneladasColhidas: toneladasColhidas,
//                             percentualEfeciencia: percentualEfeciencia,
//                             nome: nome
//                         });
//                     } else {
//                         res.status(404).send("Nenhum resultado encontrado.");
//                     }
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     res.status(500).json({ erro: "Erro ao consultar dados", erroDetalhado: erro.sqlMessage });
//                 }
//             );
//     }
// }

function obterCafeMaisEficiente(req, res) {
    const idEmpresa =  req.params.idEmpresa;
    const ano = req.params.ano;
    
    dash2Model.obterCafeMaisEficiente(idEmpresa, ano).then(function (resultado) {
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
  

function obterCafeMenosEficiente(req, res) {
    const idEmpresa =  req.params.idEmpresa;
    const ano = req.params.ano;

    dash2Model.obterCafeMenosEficiente(idEmpresa, ano).then(function (resultado) {
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

function obterTop5(req, res) {
    const idEmpresa =  req.params.idEmpresa;
    const ano = req.params.ano;

    dash2Model.obterTop5(idEmpresa, ano).then(function (resultado) {
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

function totalSafra (req, res) {
    const idEmpresa =  req.params.idEmpresa;
    const ano = req.params.ano;
    
    dash2Model.totalSafra(ano, idEmpresa).then(function (resultado) {
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
    obterTop5,
    totalSafra,
    listarAnos
};

