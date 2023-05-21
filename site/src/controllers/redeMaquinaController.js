var redeMaquinaModel = require("../models/redeMaquinaModel");

function listarRede(req, res) {

    var idMaquina = req.params.idMaquina;

    redeMaquinaModel.listarRede(idMaquina)
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

function listarMaquina(req, res) {

    var idCluster = req.params.idCluster;

    redeMaquinaModel.listarMaquina(idCluster)
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

function listarCluster(req, res) {
    var razaoSocial = req.params.razaoSocial

    redeMaquinaModel.listarCluster(razaoSocial).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os redeMaquina: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    listarRede,
    listarMaquina,
    listarCluster
}