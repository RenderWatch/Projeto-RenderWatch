var dashboardModel = require("../models/dashboardModel");

function listar(req, res) {

    var idMaquina = req.params.idMaquina;

    dashboardModel.listar(idMaquina)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os dashboards: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarRam(req, res) {

    var idMaquina = req.params.idMaquina;

    dashboardModel.listarRam(idMaquina)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os dashboards: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarDisco(req, res) {

    var idMaquina = req.params.idMaquina;

    dashboardModel.listarDisco(idMaquina)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os dashboards: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarProcessos(req, res) {
    var idGrupoProcessos = req.params.idGrupoProcessos;
  
    dashboardModel.listarProcessos(idGrupoProcessos)
      .then(function (resultado) {
        if (resultado.length > 0) {
          res.status(200).json(resultado);
        } else {
          res.status(204).send("Nenhum resultado encontrado!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os processos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }

module.exports = {
    listar,
    listarRam,
    listarDisco,
    listarProcessos
}