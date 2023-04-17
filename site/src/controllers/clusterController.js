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

function buscarDadosMaquina(req, res) {
    var idCluster = req.params.idCluster

    clusterModel.buscarDadosMaquina(idCluster).then(function (resultado) {
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

function adicionarCluster(req, res) {

    var idEmpresa = req.body.idEmpresa

    if (idEmpresa == undefined) {
        res.status(400).send("idEmpresa está undefined!");
    } else {
        
        clusterModel.adicionarCluster(idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


module.exports = {
    buscarDadosCluster,
    buscarDadosMaquina,
    adicionarCluster
    }