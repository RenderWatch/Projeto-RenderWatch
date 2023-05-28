
var alertasModel = require("../models/alertasModel");

function qtdAlertasPendentes(req, res) {

    var statusAtual= req.params.statusAtual;

    alertasModel.qtdAlertasPendentes(statusAtual)
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

function getIdClusterMaquina(req, res) {

    var idMaquina = req.params.idMaquina;

    alertasModel.getIdClusterMaquina(idMaquina)
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



module.exports = {
    qtdAlertasPendentes,
    getIdClusterMaquina

}