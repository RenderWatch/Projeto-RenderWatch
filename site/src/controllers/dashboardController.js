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

function listarTempoReal(req, res) {

    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.listarTempoReal(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    listar,
    listarTempoReal

}