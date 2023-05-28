var kpiProcessoModel = require("../models/kpiProcessoModel");

function listarAlertaCluster(req, res) {

    var idCluster = req.params.idCluster;

    kpiProcessoModel.listarAlertaCluster(idCluster)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os kpiProcessos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarAlertaMaquina(req, res) {

    var idMaquina = req.params.idMaquina;

    kpiProcessoModel.listarAlertaMaquina(idMaquina)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os kpiProcessos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarAlertaComponenteMaquina(req, res) {

    var idMaquina = req.params.idMaquina;

    kpiProcessoModel.listarAlertaComponenteMaquina(idMaquina)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os kpiProcessos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
} 

function listarMaquinaMaiorAlertas(req, res) {

    kpiProcessoModel.listarMaquinaMaiorAlertas()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os kpiProcessos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarProcessos(req, res) {

    var idMaquina = req.params.idMaquina;

    redeMaquinaModel.listarProcessos(idMaquina)
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
    listarAlertaCluster,
    listarAlertaMaquina,
    listarAlertaComponenteMaquina,
    listarMaquinaMaiorAlertas,
    listarProcessos
}