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

function deletarCluster(req, res) {
    var clusterId = req.params.clusterId

    clusterModel.deletarCluster(clusterId).then(function (resultado) {
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

function adicionarMaquina(req, res) {

    var id = req.body.id

    if (id == undefined) {
        res.status(400).send("id está undefined!");
    } else {

        clusterModel.adicionarMaquina(id)
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

function confirmarNomeCluster(req, res) {
    var idCluster = req.body.idCluster;
    var nome = req.body.nome
    if (idCluster == undefined) {
        res.status(400).send("idCluster está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("nome está undefined!");
    } else {
        clusterModel.confirmarNomeCluster(idCluster, nome)
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

function deletarClusterComMaquina(req, res) {
    var clusterId = req.body.clusterId;
    if (id == undefined) {
        res.status(400).send("Seu clusterId está undefined!");
    } else {
        clusterModel.deletarClusterComMaquina(clusterId)
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

function deletarClusterSemMaquina(req, res) {
    var id = req.body.id;
    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else {
        clusterModel.deletarClusterSemMaquina(id)
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
    adicionarCluster,
    adicionarMaquina,
    confirmarNomeCluster,
    deletarCluster,
    deletarClusterComMaquina,
    deletarClusterSemMaquina
}