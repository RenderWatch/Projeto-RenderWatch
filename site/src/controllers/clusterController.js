var clusterModel = require("../models/clusterModel");

function buscarDadosCluster(req, res) {
    var idEmpresa = req.params.idEmpresa

    clusterModel.buscarDadosCluster(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar a consulta: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    buscarDadosCluster
    }